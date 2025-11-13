// components/ContactForm.jsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState({
        loading: false,
        success: "",
        error: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ loading: true, success: "", error: "" });

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({
                loading: false,
                success: "",
                error: "Fyll inn alle feltene før du sender.",
            });
            return;
        }

        const { error } = await supabase.from("contact_messages").insert({
            name: formData.name,
            email: formData.email,
            message: formData.message,
        });

        if (error) {
            console.error(error);
            setStatus({
                loading: false,
                success: "",
                error: "Noe gikk galt. Prøv igjen senere.",
            });
        } else {
            setStatus({
                loading: false,
                success: "Takk for meldingen! Vi tar kontakt så snart vi kan.",
                error: "",
            });
            setFormData({ name: "", email: "", message: "" });
        }
    }

    return (
        <div className='max-w-md w-full mx-auto p-6 rounded-2xl border border-red-600 shadow-[0_0_40px_rgba(220,38,38,0.55)] bg-white animate-heartbeat'>
            <h1 className='text-2xl font-semibold mb-4 text-gray-900'>
                Kontakt meg
            </h1>
            <p className='text-sm text-gray-500 mb-6'>
                Fyll inn skjemaet under, så lagrer vi henvendelsen i Supabase
                eller sender deg en mail.
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-blue-500  mb-1'
                    >
                        Navn
                    </label>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder='Ditt navn'
                    />
                </div>

                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-blue-500  mb-1'
                    >
                        E-post
                    </label>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='din@epost.no'
                    />
                </div>

                <div>
                    <label
                        htmlFor='message'
                        className='block text-sm font-medium text-blue-500  mb-1'
                    >
                        Melding
                    </label>
                    <textarea
                        id='message'
                        name='message'
                        rows={4}
                        className='w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Hva kan vi hjelpe deg med?'
                    />
                </div>

                <button
                    type='submit'
                    disabled={status.loading}
                    className='w-full rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition'
                >
                    {status.loading ? "Sender..." : "Send melding"}
                </button>
            </form>

            {status.success && (
                <p className='mt-4 text-sm text-green-600'>{status.success}</p>
            )}
            {status.error && (
                <p className='mt-4 text-sm text-red-600'>{status.error}</p>
            )}
        </div>
    );
}
