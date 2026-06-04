import React from 'react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

const references = [
    {
        title: 'SOP Utama',
        path: 'docs/git-main-local-staging-rules.md',
        description: 'Aturan utama untuk sync dari main, test local, deploy staging, dan merge balik ke main.',
    },
    {
        title: 'Workflow Branch',
        path: 'docs/branch-local-staging-workflow.md',
        description: 'Ringkasan branch kerja khusus local dan staging tanpa menyentuh main.',
    },
    {
        title: 'Run Log 4 Juni 2026',
        path: 'docs/run-2026-06-04-sync-main-local-staging.md',
        description: 'Log eksekusi nyata saat origin/main disinkronkan ke branch ops dan diverifikasi di local.',
    },
];

const preflightSections = [
    {
        title: 'Preflight Local',
        items: [
            'Pastikan branch aktif bukan main dan git status sudah dipahami.',
            'Docker Desktop harus aktif sebelum bootstrap local dijalankan.',
            'Pastikan port 8000, 3307, dan 6379 tidak bentrok dengan stack lama.',
            'Jika local.fms-lvl tidak aktif, gunakan fallback resmi ke http://localhost:8000.',
            'Semua validasi Laravel local harus lewat Docker PHP 8.2, bukan PHP host WAMP.',
        ],
    },
    {
        title: 'Preflight Staging',
        items: [
            'Branch kerja harus sudah ada di remote sebelum staging dapat sync.',
            'Repo di server 155 harus checkout branch yang sama dengan branch local ops.',
            'Env staging harus mengikuti .env.staging.example dengan SESSION_DRIVER=file dan QUEUE_CONNECTION=sync.',
            'Container runtime staging harus sehat sebelum deploy.',
            'Jika git push ditahan policy, proses staging berhenti sampai ada persetujuan eksplisit.',
        ],
    },
];

const workflowSteps = [
    {
        step: '1. Sync branch ops dari origin/main',
        commands: [
            'git checkout codex/local-staging-ops',
            'git status -sb',
            'git fetch origin',
            'git merge origin/main',
        ],
        notes: [
            'Jika branch masih kotor, checkpoint dulu sebelum merge.',
            'Jika conflict menyentuh auth, route, atau Docker env, pertahankan behavior yang aman untuk local dan staging.',
        ],
    },
    {
        step: '2. Bootstrap local',
        commands: [
            'powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv',
            'powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -Fresh -RefreshEnv',
        ],
        notes: [
            'Gunakan mode Fresh bila DB local atau port lama mengganggu.',
            'Jika bootstrap gagal karena port 3307 bentrok, turunkan stack local lama dari repo ini lebih dulu.',
        ],
    },
    {
        step: '3. Smoke test local',
        commands: [
            'powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl http://localhost:8000 -Username developer -Password password',
        ],
        notes: [
            'Target minimum: LOGIN 200, ME 200, UNIT 200, TIPE 200.',
            'Jika local.fms-lvl sehat, smoke test juga boleh dijalankan lewat hostname itu.',
        ],
    },
    {
        step: '4. Push branch untuk staging',
        commands: [
            'git push -u origin codex/local-staging-ops',
        ],
        notes: [
            'Jangan deploy staging dari main.',
            'Jika push diblok policy, jangan cari jalan memutar. Minta persetujuan eksplisit dulu.',
        ],
    },
    {
        step: '5. Deploy staging',
        commands: [
            'DEPLOY_BRANCH=codex/local-staging-ops ./scripts/deploy-staging.sh',
            'powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl https://staging-fms-laravel.tirtanusa.com -Username <user-valid> -Password <password-valid>',
        ],
        notes: [
            'Target minimum staging sama: LOGIN 200, ME 200, UNIT 200, TIPE 200.',
            'Lanjutkan tes manual login, refresh session, Unit, Tipe, dan logout.',
        ],
    },
];

const latestRunHighlights = [
    'origin/main yang disinkronkan terakhir: a7d9806677f40fb75ce25d2266682df991c25d85.',
    'Conflict merge terakhir terjadi di routes/api.php dan sudah digabung dengan route merk-kendaraan.',
    'Bootstrap local sempat gagal karena Docker daemon mati dan port 3307 dipakai stack lama.',
    'Paritas local ditambah untuk m_unit_kendaraan, m_type_kendaraan, dan m_merk_kendaraan agar smoke test lolos.',
    'Smoke test local final berhasil: LOGIN 200, ME 200, UNIT 200, TIPE 200.',
    'Staging terakhir tertahan di langkah git push karena guardrail transfer keluar memerlukan persetujuan eksplisit tambahan.',
];

function SectionCard({ title, children, tone = 'default' }) {
    const toneClass =
        tone === 'accent'
            ? 'border-sky-200 bg-sky-50'
            : tone === 'warning'
              ? 'border-amber-200 bg-amber-50'
              : 'border-border bg-card';

    return (
        <section className={`rounded-2xl border p-5 shadow-sm ${toneClass}`}>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                {children}
            </div>
        </section>
    );
}

export default function RulesPlaybook() {
    return (
        <PortalLayout>
            <div className="space-y-6">
                <section className="rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#f8fbff_0%,#eef6ff_55%,#fff8ee_100%)] p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                                Staging Operations
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                                Rules and Deployment Playbook
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Halaman ini merangkum rule operasional untuk sync dari main,
                                verifikasi local, deploy staging server 155, dan keputusan merge balik ke main.
                                Halaman ini ditujukan terutama untuk environment staging.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-sky-200 bg-white/80 p-4 text-sm text-slate-600 shadow-sm">
                            <p className="font-semibold text-slate-900">Status acuan saat ini</p>
                            <ul className="mt-2 space-y-2">
                                <li>Branch kerja: <span className="font-medium">codex/local-staging-ops</span></li>
                                <li>Main terakhir yang diuji: <span className="font-medium">a7d9806</span></li>
                                <li>Fallback local resmi: <span className="font-medium">http://localhost:8000</span></li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                    <SectionCard title="Referensi Dokumen" tone="accent">
                        {references.map((reference) => (
                            <div key={reference.path} className="rounded-2xl border border-white/70 bg-white/80 p-4">
                                <p className="font-semibold text-slate-900">{reference.title}</p>
                                <p className="mt-1 font-mono text-xs text-sky-700">{reference.path}</p>
                                <p className="mt-2 leading-6">{reference.description}</p>
                            </div>
                        ))}
                    </SectionCard>

                    <SectionCard title="Highlight Run Terakhir" tone="warning">
                        <ul className="space-y-3 leading-6">
                            {latestRunHighlights.map((item) => (
                                <li key={item} className="rounded-xl border border-amber-100 bg-white/85 px-4 py-3 text-slate-700">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </SectionCard>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    {preflightSections.map((section) => (
                        <SectionCard key={section.title} title={section.title}>
                            <ul className="space-y-3">
                                {section.items.map((item) => (
                                    <li key={item} className="rounded-xl border border-border bg-white/90 px-4 py-3 text-slate-700">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </SectionCard>
                    ))}
                </div>

                <SectionCard title="Urutan Workflow" tone="accent">
                    <div className="space-y-5">
                        {workflowSteps.map((step) => (
                            <div key={step.step} className="rounded-2xl border border-white/70 bg-white/85 p-5">
                                <h3 className="text-base font-semibold text-slate-900">{step.step}</h3>
                                <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_1fr]">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                            Commands
                                        </p>
                                        <div className="mt-2 space-y-2">
                                            {step.commands.map((command) => (
                                                <pre key={command} className="overflow-x-auto rounded-xl bg-slate-950 px-4 py-3 text-xs text-slate-100">
                                                    <code>{command}</code>
                                                </pre>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                            Notes
                                        </p>
                                        <ul className="mt-2 space-y-2">
                                            {step.notes.map((note) => (
                                                <li key={note} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                                                    {note}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </PortalLayout>
    );
}
