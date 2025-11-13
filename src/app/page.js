import ContactForm from "@/components/ContactForm";
import ContactFormEmailJS from "@/components/ContactFormEmailJS";

export default function Home() {
    return (
        <main className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100'>
            <div className='max-w-5xl mx-auto px-4 py-16'>
                <div className='mb-8 flex flex-wrap items-center gap-3 justify-between'>
                    <div className='inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-300'>
                        <span className='h-2 w-2 rounded-full bg-emerald-400 animate-pulse' />
                        Live workshop · Supabase vs EmailJS
                    </div>
                    <p className='text-xs text-slate-500'>
                        Next.js · Tailwind · “Kontakt meg” på steroider
                    </p>
                </div>

                <div className='grid gap-12 md:grid-cols-[1.15fr,1fr] items-start'>
                    <section className='space-y-6'>
                        <div className='space-y-3'>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight'>
                                Ett skjema.{" "}
                                <span className='bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent'>
                                    To verdener.
                                </span>
                            </h1>
                            <p className='text-sm sm:text-base text-slate-300/90 max-w-xl'>
                                Vi bygger et enkelt{" "}
                                <span className='font-semibold'>
                                    kontakt meg-skjema
                                </span>{" "}
                                i Next.js – først koblet mot{" "}
                                <span className='font-semibold text-emerald-300'>
                                    Supabase
                                </span>{" "}
                                (database &amp; RLS), og deretter mot{" "}
                                <span className='font-semibold text-sky-300'>
                                    EmailJS
                                </span>{" "}
                                for e-postvarsling. Samme UI, to forskjellige
                                backends.
                            </p>
                        </div>

                        <div className='grid gap-3 sm:grid-cols-2'>
                            <div className='rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 shadow-[0_0_40px_rgba(16,185,129,0.15)]'>
                                <p className='text-xs font-semibold text-emerald-300 uppercase tracking-wide mb-1'>
                                    Supabase-modus
                                </p>
                                <p className='text-sm text-slate-200'>
                                    Lagrer alle henvendelser i en
                                    Postgres-tabell. Perfekt for dashboard,
                                    statistikk og videre bygging.
                                </p>
                            </div>

                            <div className='rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3'>
                                <p className='text-xs font-semibold text-sky-300 uppercase tracking-wide mb-1'>
                                    EmailJS-modus
                                </p>
                                <p className='text-sm text-slate-200'>
                                    Sender henvendelsen rett i innboksen. Ingen
                                    database, bare ren “ping meg på mail”.{" "}
                                </p>
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <h2 className='text-sm font-semibold text-slate-200 uppercase tracking-wide'>
                                I denne økten går vi gjennom
                            </h2>
                            <ul className='text-sm text-slate-300 space-y-1.5 list-disc list-inside'>
                                <li>
                                    Oppsett av miljøvariabler og Supabase-klient
                                </li>
                                <li>Enkel form-håndtering med React state</li>
                                <li>Insert til Supabase med RLS-policy</li>
                                <li>
                                    Diskusjon: når velger vi database vs
                                    e-post-tjeneste?
                                </li>
                            </ul>
                        </div>
                    </section>
                    <div className='flex flex-col gap-20 lg:flex-row'>
                        <section className='md:mt-4'>
                            <ContactForm />
                        </section>

                        <section className='md:mt-4'>
                            <ContactFormEmailJS />
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
