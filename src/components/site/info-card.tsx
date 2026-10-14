export function InfoCard({
  org,
  role,
  period,
  location,
}: {
  org: string;
  role: string;
  period?: string;
  location?: string;
}) {
  return (
    <div className="flex flex-col border border-border bg-card p-8">
      <p className="label !text-primary">{org}</p>
      <h3 className="mt-3 text-xl tracking-tight">{role}</h3>
      {/* mt-auto pins this block to the bottom edge, so period/location line up
          across cards even when role titles wrap to different heights. */}
      {period || location ? (
        <div className="mt-auto pt-6">
          {period ? <p className="label">{period}</p> : null}
          {location ? (
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
              {location}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
