"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function AdminPage() {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({
        loading: true,
        error: "",
    });

    async function fetchMessages() {
        setStatus({ loading: true, error: "" });

        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Supabase select error:", error);
            setStatus({
                loading: false,
                error: `Kunne ikke hente meldinger: ${error.message}`,
            });
        } else {
            setMessages(data || []);
            setStatus({ loading: false, error: "" });
        }
    }

    useEffect(() => {
        async function load() {
            await fetchMessages();
        }
        load();
    }, []);

    return (
        <main className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100'>
            <div className='max-w-5xl mx-auto px-4 py-10 md:py-16'>
                <header className='mb-8 flex flex-wrap items-center justify-between gap-4'>
                    <div>
                        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight'>
                            Admin ·{" "}
                            <span className='bg-linear-to-r from-red-400 via-amber-300 to-rose-400 bg-clip-text text-transparent'>
                                Kontaktmeldinger
                            </span>
                        </h1>
                        <p className='mt-2 text-sm text-slate-400 max-w-xl'>
                            Her ser du alle henvendelser som er sendt inn via
                            kontakt-skjema. Dataene kommer direkte fra
                            Supabase-tabellen{" "}
                            <code className='font-mono text-xs bg-slate-900/60 px-1.5 py-0.5 rounded'>
                                contact_messages
                            </code>
                            .
                        </p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-slate-200'>
                            <span className='h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse' />
                            {messages.length === 0
                                ? "Ingen meldinger ennå"
                                : `${messages.length} melding${
                                      messages.length === 1 ? "" : "er"
                                  }`}
                        </span>
                        <button
                            onClick={fetchMessages}
                            disabled={status.loading}
                            className='rounded-full border border-slate-600 bg-slate-800/80 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed transition'
                        >
                            {status.loading ? "Laster..." : "Last inn på nytt"}
                        </button>
                    </div>
                </header>

                <section className='rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-6 shadow-[0_0_40px_rgba(15,23,42,0.8)]'>
                    {status.error && (
                        <div className='mb-4 rounded-xl border border-rose-500/60 bg-rose-950/40 px-4 py-3 text-sm text-rose-100'>
                            {status.error}
                        </div>
                    )}

                    {status.loading && !status.error && (
                        <p className='text-sm text-slate-300'>
                            Henter meldinger…
                        </p>
                    )}

                    {!status.loading &&
                        !status.error &&
                        messages.length === 0 && (
                            <p className='text-sm text-slate-400'>
                                Det er ingen meldinger i databasen enda. Send
                                inn en via kontakt-skjemaet for å teste.
                            </p>
                        )}

                    {!status.loading &&
                        !status.error &&
                        messages.length > 0 && (
                            <ul className='space-y-4'>
                                {messages.map((msg) => (
                                    <li
                                        key={msg.id}
                                        className='rounded-xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 md:px-5 md:py-4'
                                    >
                                        <div className='flex flex-wrap items-center justify-between gap-2 mb-2'>
                                            <div className='space-y-1'>
                                                <p className='text-sm font-semibold text-slate-50'>
                                                    {msg.name ||
                                                        "Ukjent avsender"}
                                                </p>
                                                <p className='text-xs text-slate-400'>
                                                    {msg.email ||
                                                        "Ingen e-post oppgitt"}
                                                </p>
                                            </div>
                                            <p className='text-xs text-slate-500'>
                                                {msg.created_at
                                                    ? new Date(
                                                          msg.created_at
                                                      ).toLocaleString(
                                                          "nb-NO",
                                                          {
                                                              year: "numeric",
                                                              month: "2-digit",
                                                              day: "2-digit",
                                                              hour: "2-digit",
                                                              minute: "2-digit",
                                                          }
                                                      )
                                                    : "Ukjent tidspunkt"}
                                            </p>
                                        </div>

                                        <div className='mt-2 text-sm text-slate-200 whitespace-pre-wrap'>
                                            {msg.message}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    <Link
                        href='/'
                        className='mt-8 inline-flex items-center rounded-full border border-slate-600 bg-slate-800/80 px-4 py-1.5 gap-2 text-xs font-medium text-slate-100 hover:bg-slate-700 transition'
                    >
                        Tilbake til forsiden
                    </Link>
                </section>
            </div>
        </main>
    );
}
