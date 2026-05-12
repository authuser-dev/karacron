export default function Dashboard() {
	return (
		<section className="flex min-h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20">
			<header className="border-b border-white/10 pb-6">
				<p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">
					Panel de administrador
				</p>
				<h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
					Dashboard
				</h1>
				<p className="mt-2 max-w-2xl text-sm text-neutral-400">
					Base privada lista para montar modulos, metricas, accesos y
					herramientas de operacion.
				</p>
			</header>

			<div className="grid flex-1 gap-6 pt-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
				<div className="rounded-2xl border border-white/10 bg-neutral-900/70 p-6">
					<p className="text-sm text-neutral-300">
						Zona principal para tablas, widgets o vistas de gestion.
					</p>
				</div>
				<aside className="rounded-2xl border border-white/10 bg-neutral-900/50 p-6">
					<p className="text-sm text-neutral-300">
						Columna secundaria para actividad, filtros, accesos
						rapidos o alertas.
					</p>
				</aside>
			</div>
		</section>
	);
}
