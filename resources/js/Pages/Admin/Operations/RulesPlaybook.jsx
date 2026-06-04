import React from 'react';
import {
    BookMarked,
    Boxes,
    CheckCircle2,
    ExternalLink,
    FileText,
    GitBranch,
    MonitorSmartphone,
    ServerCog,
    ShieldCheck,
} from 'lucide-react';
import PortalLayout from '@/Pages/Layouts/PortalLayout';

const references = [
    {
        title: 'SOP Utama',
        path: 'docs/git-main-local-staging-rules.md',
        description: 'Aturan utama untuk sync dari main, test local, deploy staging, dan merge balik ke main.',
        icon: BookMarked,
    },
    {
        title: 'Workflow Branch',
        path: 'docs/branch-local-staging-workflow.md',
        description: 'Ringkasan branch kerja khusus local dan staging tanpa menyentuh main.',
        icon: GitBranch,
    },
    {
        title: 'Run Log 4 Juni 2026',
        path: 'docs/run-2026-06-04-sync-main-local-staging.md',
        description: 'Log eksekusi nyata dari sync origin/main, bootstrap local, sampai deploy staging live.',
        icon: FileText,
    },
];

const quickStatus = [
    {
        label: 'Branch Aktif',
        value: 'codex/local-staging-ops',
        detail: 'Branch khusus local dan staging, tidak menyentuh main.',
    },
    {
        label: 'Main Terakhir Diuji',
        value: 'a7d9806',
        detail: 'Sudah disinkronkan ke branch ops dan diverifikasi di local.',
    },
    {
        label: 'Staging Route',
        value: '/portal/staging/rules',
        detail: 'Muncul di sidebar saat env staging mengaktifkan Rules & Docs.',
    },
];

const deploymentHighlights = [
    'Smoke test staging terakhir lulus: LOGIN 200, ME 200, UNIT 200, TIPE 200.',
    'Bundle aktif staging sudah memuat halaman Rules & Docs.',
    'Fallback local resmi tetap http://localhost:8000 bila local.fms-lvl belum sehat.',
    'Validasi Laravel local wajib lewat Docker PHP 8.2, bukan PHP host WAMP.',
];

const preflightSections = [
    {
        title: 'Preflight Local',
        icon: MonitorSmartphone,
        items: [
            'Pastikan branch aktif bukan main dan git status sudah dipahami.',
            'Docker Desktop harus aktif sebelum bootstrap local dijalankan.',
            'Pastikan port 8000, 3315, dan 6379 tidak bentrok dengan stack lama.',
            'Jika local.fms-lvl tidak aktif, gunakan fallback resmi ke http://localhost:8000.',
            'Semua validasi Laravel local harus lewat Docker PHP 8.2, bukan PHP host WAMP.',
        ],
    },
    {
        title: 'Preflight Staging',
        icon: ServerCog,
        items: [
            'Branch kerja harus sudah ada di remote sebelum staging dapat sync.',
            'Runtime staging server 155 boleh memakai artifact branch yang sudah diuji jika runtime aktif bukan checkout Git bersih.',
            'Env staging harus mengikuti .env.staging.example dengan SESSION_DRIVER=file dan QUEUE_CONNECTION=sync.',
            'Container runtime staging harus sehat sebelum deploy.',
            'Jika git push diblok policy, proses staging berhenti sampai ada persetujuan eksplisit.',
        ],
    },
];

const workflowSteps = [
    {
        step: '1. Sync branch ops dari origin/main',
        icon: GitBranch,
        summary: 'Tarik main terbaru ke branch ops, lalu selesaikan conflict tanpa mengorbankan workflow local dan staging.',
        commands: [
            'git checkout codex/local-staging-ops',
            'git status -sb',
            'git fetch origin',
            'git merge origin/main',
        ],
        notes: [
            'Jika branch masih kotor, checkpoint dulu sebelum merge.',
            'Jika conflict menyentuh auth, route, atau Docker env, pertahankan behavior aman untuk local dan staging.',
        ],
    },
    {
        step: '2. Bootstrap local',
        icon: Boxes,
        summary: 'Jalankan stack local branch-only dengan env parity minimum dan build frontend produksi.',
        commands: [
            'powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -RefreshEnv',
            'powershell -ExecutionPolicy Bypass -File scripts/bootstrap-local.ps1 -Fresh -RefreshEnv',
        ],
        notes: [
            'Gunakan mode Fresh bila DB local atau port lama mengganggu.',
            'Jika port 3315 bentrok, turunkan stack compose repo lama atau ganti service DB host Windows yang masih aktif.',
        ],
    },
    {
        step: '3. Smoke test local',
        icon: ShieldCheck,
        summary: 'Pastikan auth dan modul master dasar lolos sebelum branch dianggap siap lanjut ke staging.',
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
        icon: ExternalLink,
        summary: 'Branch yang sama harus tersedia di remote sebelum staging dapat mengikuti source yang benar.',
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
        icon: CheckCircle2,
        summary: 'Build ulang app staging dari branch atau artifact branch yang sudah lolos local test, lalu verifikasi domain dan smoke test.',
        commands: [
            'DEPLOY_BRANCH=codex/local-staging-ops ./scripts/deploy-staging.sh',
            'powershell -ExecutionPolicy Bypass -File scripts/smoke-test-fms.ps1 -BaseUrl https://staging-fms-laravel.tirtanusa.com -Username <user-valid> -Password <password-valid>',
        ],
        notes: [
            'Target minimum staging sama: LOGIN 200, ME 200, UNIT 200, TIPE 200.',
            'Lanjutkan tes manual login, refresh session, Unit, Tipe, Merk, dan logout.',
        ],
    },
];

function SectionCard({ title, children, tone = 'default', icon: Icon }) {
    const toneClass =
        tone === 'accent'
            ? 'border-sky-200/80 bg-white/80 shadow-[0_18px_45px_rgba(22,78,99,0.08)]'
            : tone === 'warning'
              ? 'border-amber-200/80 bg-white/80 shadow-[0_18px_45px_rgba(146,64,14,0.08)]'
              : 'border-slate-200/80 bg-white/88 shadow-[0_18px_45px_rgba(15,23,42,0.06)]';

    return (
        <section className={`rounded-[28px] border p-5 sm:p-6 ${toneClass}`}>
            <div className="flex items-center gap-3">
                {Icon ? (
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <Icon size={20} />
                    </div>
                ) : null}
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                </div>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-600">{children}</div>
        </section>
    );
}

function CommandBlock({ command }) {
    return (
        <pre className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#040b1f] px-4 py-3 text-xs leading-6 text-slate-100 whitespace-pre-wrap break-words">
            <code>{command}</code>
        </pre>
    );
}

export default function RulesPlaybook() {
    return (
        <PortalLayout>
            <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 pb-8">
                <section className="overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_35%),linear-gradient(135deg,#ffffff_0%,#f4faff_58%,#fffaf1_100%)] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
                                Staging Operations
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                                Rules and Deployment Playbook
                            </h1>
                            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                                Halaman ini merangkum SOP sync dari main, verifikasi local,
                                deploy staging server 155, fallback operasional, serta ringkasan
                                run terakhir. Fokusnya adalah menjaga local dan staging tetap rapi
                                tanpa mengganggu branch main.
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {quickStatus.map((item) => (
                                <div key={item.label} className="rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        {item.label}
                                    </p>
                                    <p className="mt-2 text-sm font-semibold text-slate-900">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-slate-600">
                                        {item.detail}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
                    <SectionCard title="Referensi Dokumen" tone="accent" icon={BookMarked}>
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                            {references.map((reference) => {
                                const Icon = reference.icon;

                                return (
                                    <div key={reference.path} className="rounded-2xl border border-slate-200 bg-white/92 p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                                                <Icon size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-slate-900">{reference.title}</p>
                                                <p className="mt-1 break-all font-mono text-[11px] text-sky-700">
                                                    {reference.path}
                                                </p>
                                                <p className="mt-3 leading-6 text-slate-600">{reference.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionCard>

                    <SectionCard title="Highlight Deployment Saat Ini" tone="warning" icon={CheckCircle2}>
                        <div className="space-y-3">
                            {deploymentHighlights.map((item) => (
                                <div key={item} className="rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 leading-6 text-slate-700">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </SectionCard>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                    {preflightSections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <SectionCard key={section.title} title={section.title} icon={Icon}>
                                <div className="space-y-3">
                                    {section.items.map((item) => (
                                        <div key={item} className="rounded-2xl border border-slate-200 bg-white/92 px-4 py-3 leading-6 text-slate-700">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </SectionCard>
                        );
                    })}
                </div>

                <SectionCard title="Urutan Workflow" tone="accent" icon={ShieldCheck}>
                    <div className="space-y-5">
                        {workflowSteps.map((step) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.step} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/95 p-5 sm:p-6">
                                    <div className="flex flex-wrap items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                                            <Icon size={20} />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900">{step.step}</h3>
                                            <p className="mt-2 max-w-4xl leading-6 text-slate-600">
                                                {step.summary}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                                        <div className="min-w-0">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                Commands
                                            </p>
                                            <div className="mt-3 space-y-3">
                                                {step.commands.map((command) => (
                                                    <CommandBlock key={command} command={command} />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                                Notes
                                            </p>
                                            <div className="mt-3 space-y-3">
                                                {step.notes.map((note) => (
                                                    <div key={note} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 leading-6 text-slate-700">
                                                        {note}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </SectionCard>
            </div>
        </PortalLayout>
    );
}
