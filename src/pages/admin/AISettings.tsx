import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, ExternalLink, KeyRound, Save, ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useHelp } from '@/hooks/useHelp';
import { PROVIDERS } from '@/constants/admin';

const aiSettingsSchema = z.object({
  aiName: z.string().trim().min(1, 'Enter an assistant name.').max(60, 'Use 60 characters or fewer.'),
  greeting: z.string().trim().min(1, 'Enter a greeting.').max(500, 'Use 500 characters or fewer.'),
  aiEnabled: z.boolean(),
});
type AIValues = z.infer<typeof aiSettingsSchema>;

export default function AISettings() {
  const { data, update } = useHelp();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AIValues>({
    resolver: zodResolver(aiSettingsSchema),
    defaultValues: { aiName: data.settings.aiName, greeting: data.settings.greeting, aiEnabled: data.settings.aiEnabled },
  });
  const save = handleSubmit(values => {
    update(current => ({ ...current, settings: { ...current.settings, ...values } }));
    toast.success('Chat configuration saved in this browser preview.');
  });

  return <div className="slide-in">
    <p className="eyebrow mb-2">Glow Assistant</p>
    <h1 className="page-title">A guide with your glow.</h1>
    <p className="mb-7 mt-3 text-base text-subtle">Manage the support chat identity and review provider connection status.</p>
    <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
      <form className="glass space-y-6 p-6 md:p-8" onSubmit={save}>
        <h2 className="flex items-center gap-3 text-xl font-semibold"><Sparkles className="text-primary" size={23} />Assistant identity</h2>
        <div><label htmlFor="assistant-name" className="block text-base font-medium">Public assistant name</label><input id="assistant-name" className="field mt-2" maxLength={60} aria-invalid={Boolean(errors.aiName)} aria-describedby={errors.aiName ? 'assistant-name-error' : undefined} {...register('aiName')} />{errors.aiName && <p id="assistant-name-error" role="alert" className="mt-2 flex items-center gap-2 text-sm"><AlertCircle size={16} />{errors.aiName.message}</p>}</div>
        <div><label htmlFor="assistant-greeting" className="block text-base font-medium">Greeting</label><textarea id="assistant-greeting" className="field mt-2" rows={3} maxLength={500} aria-invalid={Boolean(errors.greeting)} aria-describedby={errors.greeting ? 'assistant-greeting-error' : undefined} {...register('greeting')} />{errors.greeting && <p id="assistant-greeting-error" role="alert" className="mt-2 flex items-center gap-2 text-sm"><AlertCircle size={16} />{errors.greeting.message}</p>}</div>
        <label className="flex min-h-11 items-center gap-3 text-base"><input type="checkbox" {...register('aiEnabled')} />Show support chat</label>
        <div className="rounded-xl bg-primary/5 p-4"><h3 className="mb-2 font-semibold">Knowledge guardrails</h3><p className="text-base leading-7 text-subtle">Use published articles only. Never approve a return, access an order, claim payment availability, or announce unverified agent presence. Unknown answers direct customers to official support.</p></div>
        <p className="text-sm text-subtle">These settings are stored in this browser only. Showing the chat does not connect an AI provider.</p>
        <button className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50" type="submit" disabled={isSubmitting}><Save size={16} />{isSubmitting ? 'Saving…' : 'Save chat configuration'}</button>
      </form>
      <section className="glass p-6 md:p-8">
        <h2 className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck size={22} className="text-primary" />Secure before connected</h2>
        <p className="mt-4 text-base leading-7 text-subtle">Provider connections are not implemented in this preview. API keys must be configured server-side, never in local storage or frontend code.</p>
        <ol className="mt-6 list-decimal space-y-4 pl-5 text-base leading-7 text-subtle"><li>Verify the authorized owner account.</li><li>Configure provider credentials through OnSpace Cloud Secrets.</li><li>Implement authenticated model discovery and selection.</li><li>Validate roles, rate-limit requests, and retrieve published content server-side.</li><li>Test privacy, grounded answers, and human handoff before enabling AI.</li></ol>
        <a className="btn-secondary mt-6" href="https://help.onspace.ai/" target="_blank" rel="noreferrer">OnSpace documentation<ExternalLink size={16} /></a>
      </section>
    </div>
    <section className="mt-8" aria-labelledby="providers-title">
      <h2 id="providers-title" className="text-xl font-semibold">Eight provider connection slots</h2>
      <p className="mb-5 mt-2 text-base text-subtle">Connection status is unverified. Live model discovery and provider selection require server-side integration.</p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{PROVIDERS.map((provider, index) => <article className="glass p-6" key={provider.name}>
        <div className="flex items-center justify-between gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 font-semibold text-primary" aria-hidden="true">{provider.name.slice(0, 2)}</span><span className="text-sm text-subtle">Not verified</span></div>
        <h3 className="mt-5 text-lg font-semibold">{provider.name}</h3><p className="mt-2 text-base text-subtle">{provider.description}</p><p className="mt-2 text-sm text-subtle">{provider.model}</p>
        <label htmlFor={`provider-${index}`} className="mt-5 block text-base font-medium">Secure API key</label><input id={`provider-${index}`} className="field mt-2 disabled:cursor-not-allowed disabled:opacity-60" disabled type="password" placeholder={provider.name === 'OnSpace AI' ? 'Managed service — no key needed' : 'Server-side setup required'} />
        <button type="button" disabled className="btn-secondary mt-3 w-full disabled:cursor-not-allowed disabled:opacity-50"><KeyRound size={16} />Connection unavailable</button>
      </article>)}</div>
    </section>
  </div>;
}
