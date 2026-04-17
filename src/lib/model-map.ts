/**
 * Maps Anthropic/Claude Code model names to Cursor CLI model IDs
 * so clients like Claude Code can send "claude-opus-4-7" and the proxy routes correctly.
 * Latest model per vendor at top, everything else under "older".
 */

/** Anthropic-style model name (any case) -> Cursor CLI model id */
const ANTHROPIC_TO_CURSOR: Record<string, string> = {
  // ── Latest (one per vendor) ──
  "claude-opus-4-7": "claude-opus-4-7",
  "claude-opus-4.7": "claude-opus-4-7",
  "gpt-5.4": "gpt-5.4",
  "gpt-5.4-mini": "gpt-5.4-mini",
  "gemini-3.1-pro": "gemini-3.1-pro",
  "composer-2": "composer-2",
  "composer-2-fast": "composer-2-fast",

  // ── Anthropic: older ──
  "claude-opus-4-7-low": "claude-opus-4-7-low",
  "claude-opus-4-7-medium": "claude-opus-4-7-medium",
  "claude-opus-4-7-high": "claude-opus-4-7-high",
  "claude-opus-4-7-xhigh": "claude-opus-4-7-xhigh",
  "claude-opus-4-7-max": "claude-opus-4-7-max",
  "claude-opus-4-7-thinking": "claude-opus-4-7-thinking-medium",
  "claude-opus-4-7-thinking-low": "claude-opus-4-7-thinking-low",
  "claude-opus-4-7-thinking-medium": "claude-opus-4-7-thinking-medium",
  "claude-opus-4-7-thinking-high": "claude-opus-4-7-thinking-high",
  "claude-opus-4-7-thinking-xhigh": "claude-opus-4-7-thinking-xhigh",
  "claude-opus-4-7-thinking-max": "claude-opus-4-7-thinking-max",
  "claude-sonnet-4-6": "claude-4.6-sonnet-medium",
  "claude-sonnet-4.6": "claude-4.6-sonnet-medium",
  "claude-sonnet-4-6-thinking": "claude-4.6-sonnet-medium-thinking",
  "claude-sonnet-4-5": "claude-4.5-sonnet",
  "claude-sonnet-4.5": "claude-4.5-sonnet",
  "claude-sonnet-4-5-thinking": "claude-4.5-sonnet-thinking",
  "claude-opus-4": "claude-4-sonnet",
  "claude-sonnet-4": "claude-4-sonnet",
  "claude-sonnet-4-thinking": "claude-4-sonnet-thinking",
  "claude-haiku-4-5-20251001": "auto",
  "claude-haiku-4-5": "auto",
  "claude-haiku-4-6": "auto",
  "claude-haiku-4": "auto",

  // ── OpenAI: older ──
  "gpt-5.4-high": "gpt-5.4-high",
  "gpt-5.4-high-fast": "gpt-5.4-high-fast",
  "gpt-5.4-xhigh": "gpt-5.4-xhigh",
  "gpt-5.4-xhigh-fast": "gpt-5.4-xhigh-fast",
  "gpt-5.4-low": "gpt-5.4-low",
  "gpt-5.4-medium": "gpt-5.4-medium",
  "gpt-5.4-medium-fast": "gpt-5.4-medium-fast",
  "gpt-5.4-mini-low": "gpt-5.4-mini-low",
  "gpt-5.4-mini-medium": "gpt-5.4-mini-medium",
  "gpt-5.4-mini-high": "gpt-5.4-mini-high",
  "gpt-5.4-mini-xhigh": "gpt-5.4-mini-xhigh",
  "gpt-5.3-codex": "gpt-5.3-codex",
  "gpt-5.3-codex-low": "gpt-5.3-codex-low",
  "gpt-5.3-codex-high": "gpt-5.3-codex-high",
  "gpt-5.3-codex-xhigh": "gpt-5.3-codex-xhigh",
  "gpt-5.3-codex-fast": "gpt-5.3-codex-fast",
  "gpt-5.3-codex-low-fast": "gpt-5.3-codex-low-fast",
  "gpt-5.3-codex-high-fast": "gpt-5.3-codex-high-fast",
  "gpt-5.3-codex-xhigh-fast": "gpt-5.3-codex-xhigh-fast",
  "gpt-5.2": "gpt-5.2",
  "gpt-5.2-codex": "gpt-5.2-codex",
  "gpt-5.1": "gpt-5.1",
  "gpt-5": "gpt-5.1",
  "gpt-5.1-codex-mini": "gpt-5.1-codex-mini",
  "gpt-5.1-codex-max-medium": "gpt-5.1-codex-max-medium",
  "gpt-5.1-codex-max-high": "gpt-5.1-codex-max-high",

  // ── Google: older ──
  "gemini-3-flash": "gemini-3-flash",

  // ── xAI ──
  "grok-4-20": "grok-4-20",
  "grok-4-20-thinking": "grok-4-20-thinking",

  // ── Moonshot ──
  "kimi-k2.5": "kimi-k2.5",

  // ── Cursor: older ──
  "composer-1.5": "composer-1.5",
};

/** Cursor IDs we want to expose under Anthropic-style names in GET /v1/models */
const CURSOR_TO_ANTHROPIC_ALIAS: Array<{ cursorId: string; anthropicId: string; name: string }> = [
  { cursorId: "claude-opus-4-7", anthropicId: "claude-opus-4-7", name: "Claude Opus 4.7" },
  { cursorId: "gpt-5.4", anthropicId: "gpt-5.4", name: "GPT-5.4" },
  { cursorId: "gemini-3.1-pro", anthropicId: "gemini-3.1-pro", name: "Gemini 3.1 Pro" },
  { cursorId: "composer-2", anthropicId: "composer-2", name: "Composer 2" },
];

/**
 * Resolve a requested model (e.g. from the client) to the Cursor CLI model ID.
 * If the request uses an Anthropic-style name, returns the mapped Cursor ID; otherwise returns the value as-is.
 */
export function resolveToCursorModel(requested: string | undefined): string | undefined {
  if (!requested || !requested.trim()) return undefined;
  const key = requested.trim().toLowerCase();
  return ANTHROPIC_TO_CURSOR[key] ?? requested.trim();
}

/**
 * Return extra model list entries for GET /v1/models so clients like Claude Code
 * see Anthropic-style ids (e.g. claude-opus-4-7) when those Cursor models are available.
 */
export function getAnthropicModelAliases(availableCursorIds: string[]): Array<{ id: string; name: string }> {
  const set = new Set(availableCursorIds);
  return CURSOR_TO_ANTHROPIC_ALIAS
    .filter((a) => set.has(a.cursorId))
    .map((a) => ({ id: a.anthropicId, name: a.name }));
}
