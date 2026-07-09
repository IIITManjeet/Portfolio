import React, { useState } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import { socials, contactRoles } from "../constants";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: contactRoles[0],
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${socials.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            interested_in: form.role,
            message: form.message,
            _subject: `[portfolio] ${form.role} — ${form.name}`,
          }),
        }
      );
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", role: contactRoles[0], message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" index="07" kicker="contact" title="Let's talk latency, ledgers, or chains." size="sm">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          <p className="font-inter text-[16px] leading-[27px] text-mut">
            Open to <span className="text-fg">quant dev</span>,{" "}
            <span className="text-fg">backend / distributed systems</span> and{" "}
            <span className="text-fg">web3</span> roles — and freelance
            projects in all three. Tell me what you're building; I usually
            reply within 24 hours.
          </p>

          <div className="bg-panel/80 border border-line rounded-xl p-5 font-mono text-[13.5px] flex flex-col gap-3">
            <p>
              <span className="text-dim">email </span>
              <a
                href={`mailto:${socials.email}`}
                className="text-acc hover:underline"
              >
                {socials.email}
              </a>
            </p>
            <p>
              <span className="text-dim">github </span>
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-acc hover:underline"
              >
                /IIITManjeet
              </a>
            </p>
            <p>
              <span className="text-dim">linkedin </span>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-acc hover:underline"
              >
                /manjeet-pathak
              </a>
            </p>
            <p>
              <span className="text-dim">leetcode </span>
              <a
                href={socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="text-acc hover:underline"
              >
                /conqueror_61_m
              </a>
            </p>
            <p>
              <span className="text-dim">status </span>
              <span className="text-acc">● open to work</span>
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-panel/80 border border-line rounded-xl p-6 flex flex-col gap-4 glow-acc"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[12.5px] text-dim">name *</span>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="field"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[12.5px] text-dim">email *</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="field"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[12.5px] text-dim">
              interested in *
            </span>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="field cursor-pointer appearance-none pr-10"
              >
                {contactRoles.map((r) => (
                  <option key={r} value={r} className="bg-panel text-fg">
                    {r}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[12px] text-dim">
                ▾
              </span>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-mono text-[12.5px] text-dim">message *</span>
            <textarea
              required
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Scope, stack, timeline — or just say hi."
              className="field resize-y"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="font-mono text-[14px] bg-acc text-ink font-semibold rounded px-6 py-3 w-fit hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer border-0"
          >
            {status === "sending" ? "sending..." : "send message →"}
          </button>

          {status === "sent" && (
            <p className="font-mono text-[13px] text-acc">
              ✓ delivered — I'll get back to you within 24h.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-[13px] text-down">
              ✗ the form service is unreachable right now —{" "}
              <a
                href={`mailto:${socials.email}?subject=${encodeURIComponent(
                  `[portfolio] ${form.role} — ${form.name}`
                )}&body=${encodeURIComponent(form.message)}`}
                className="underline text-acc"
              >
                send the same message via email
              </a>{" "}
              (your text is preserved)
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
};

export default Contact;
