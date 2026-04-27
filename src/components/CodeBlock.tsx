import { useLanguagePreference, type Language } from "../hooks/useLanguagePreference";

interface Props {
  variants: Record<string, string>;
  labels?: Record<string, string>;
}

const LANG_LABELS: Record<string, string> = {
  python: "Python",
  typescript: "TypeScript",
};

export default function CodeBlock({ variants, labels }: Props) {
  const [lang, setLang] = useLanguagePreference();

  const available = Object.keys(variants) as Language[];
  const active = available.includes(lang) ? lang : available[0];
  const resolvedLabels = { ...LANG_LABELS, ...labels };

  return (
    <div class="code-block">
      <div class="code-block__tabs">
        {available.map((l) => (
          <button
            key={l}
            class={`code-block__tab ${l === active ? "code-block__tab--active" : ""}`}
            onClick={() => setLang(l)}
          >
            {resolvedLabels[l] ?? l}
          </button>
        ))}
      </div>
      <div
        class="code-block__content"
        dangerouslySetInnerHTML={{ __html: variants[active] }}
      />
    </div>
  );
}
