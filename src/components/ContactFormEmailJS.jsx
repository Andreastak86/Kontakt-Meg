// components/ContactFormEmailJS.jsx
"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactFormEmailJS() {
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

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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

        if (!serviceId || !templateId || !publicKey) {
            setStatus({
                loading: false,
                success: "",
                error: "EmailJS er ikke riktig konfigurert. Sjekk miljøvariablene dine.",
            });
            return;
        }

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            };

            const result = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                {
                    publicKey,
                }
            );

            console.log("EmailJS result:", result);

            setStatus({
                loading: false,
                success: "Takk for meldingen! Den er sendt til innboksen min.",
                error: "",
            });

            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("EmailJS error:", error);
            setStatus({
                loading: false,
                success: "",
                error: "Noe gikk galt ved sending av e-post. Prøv igjen senere.",
            });
        }
    }

    return (
        <div className='max-w-md w-full mx-auto p-6 rounded-2xl border border-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.55)] bg-white animate-heartbeat'>
            <h1 className='text-2xl font-semibold mb-4 text-gray-900'>
                Kontakt meg (EmailJS)
            </h1>
            <p className='text-sm text-gray-500 mb-6'>
                Denne varianten sender meldingen direkte som{" "}
                <span className='font-semibold'>e-post</span> via EmailJS –
                ingen database, bare rett i innboksen.
            </p>

            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Navn */}
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-red-700 mb-1'
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

                {/* E-post */}
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium text-red-700  mb-1'
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

                {/* Melding */}
                <div>
                    <label
                        htmlFor='message'
                        className='block text-sm font-medium text-red-700  mb-1'
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

            {/* Status-meldinger */}
            {status.success && (
                <p className='mt-4 text-sm text-green-600'>{status.success}</p>
            )}
            {status.error && (
                <p className='mt-4 text-sm text-red-600'>{status.error}</p>
            )}
        </div>
    );
}
