export default function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="group h-full rounded-3xl border border-brand-100 bg-mist p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_40px_-20px_rgba(20,83,45,0.45)] sm:p-7">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-lg text-white transition-colors group-hover:bg-brand-700">
        <Icon aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {service.description}
      </p>
    </article>
  );
}
