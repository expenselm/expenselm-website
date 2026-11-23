// "Connect your assistant" pages (/connect and /connect/<slug>), action plan 1.18.
//
// Assistants change their menus often, so each guide keeps its steps short, links to the
// assistant's own help page, and carries the date it was last checked. Re-check a guide
// (and update `lastChecked`) whenever you hear its steps have changed.
//
// Text in `text`, `notes` and `requirements` may use `code` and **bold**.

export const MCP_SERVER_URL = 'https://mcp.expenselm.ai/mcp';
export const WEB_APP_URL = 'https://web.expenselm.ai';
export const CONNECTED_AGENTS_URL = 'https://web.expenselm.ai/user-settings#agents';

export interface IConnectStep {
    text: string;
    /** A command or config block shown under the step, with a copy button. */
    code?: string;
}

export interface IConnectGuide {
    slug: string;
    name: string;
    /** One line for the card on /connect. */
    summary: string;
    /** "Sign in" (OAuth, the default) or an API key. */
    signIn: 'oauth' | 'api-key';
    requirements: string[];
    steps: IConnectStep[];
    notes?: string[];
    help?: { label: string; url: string };
    lastChecked: string;
}

export const connectGuides: IConnectGuide[] = [
    {
        slug: 'claude',
        name: 'Claude',
        summary: 'Claude on the web, desktop and mobile, and Cowork.',
        signIn: 'oauth',
        requirements: [
            'Any Claude plan. The Free plan allows one custom connector.',
            'On a Team or Enterprise plan, an Owner adds the connector for the organization first; then each member connects with their own ExpenseLM account.',
        ],
        steps: [
            { text: 'In Claude, open **Customize → Connectors**.' },
            { text: 'Select **Add**, then **Add custom connector**.' },
            { text: 'Enter the name `ExpenseLM` and the server address below, then select **Continue** and **Add**.', code: MCP_SERVER_URL },
            { text: 'Select **Connect** and sign in with your ExpenseLM account (Google, Apple or email).' },
            { text: 'In a chat, make sure ExpenseLM is turned on in the connectors menu, then ask about your spending.' },
        ],
        notes: [
            'Connectors you add on the web also work in the desktop and mobile apps.',
            'Claude allows one connector per server address. To use a different ExpenseLM account, remove the connector and add it again, then sign in with the other account.',
            'To add a receipt you attached in the chat, Claude gives you an upload link: open it and pick the photo.',
        ],
        help: { label: 'Claude: custom connectors', url: 'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'chatgpt',
        name: 'ChatGPT',
        summary: 'ChatGPT on the web, with developer mode. Includes dots.',
        signIn: 'oauth',
        requirements: [
            'ChatGPT on the web. Custom MCP servers aren\'t available on the Free plan.',
            'On Business, Enterprise and Edu plans, a workspace admin turns on developer mode and adds the app for the workspace.',
            'Plus and Pro plans can add custom servers in developer mode, but OpenAI may limit them to reading. Check OpenAI\'s help page for your plan.',
        ],
        steps: [
            { text: 'On chatgpt.com, open **Settings → Apps → Advanced settings** and turn on **Developer mode**.' },
            { text: 'Create an app for a custom MCP server (from **Apps → Create**, or **Plugins → + → Add custom MCP server**, depending on your version).' },
            { text: 'Name it `ExpenseLM`, enter the server address below, and choose **OAuth** for authentication.', code: MCP_SERVER_URL },
            { text: 'Sign in with your ExpenseLM account when asked, then create the app.' },
            { text: 'In a chat, choose **Developer mode** from the **+** menu and select ExpenseLM.' },
        ],
        notes: [
            'ChatGPT asks before running tools that change data, such as saving or deleting an expense.',
            '**Dots** (always-on personal agents, on some plans) use the apps already installed on your account, so they can use ExpenseLM once it\'s added.',
        ],
        help: { label: 'OpenAI: developer mode and MCP apps', url: 'https://help.openai.com/en/articles/12584461' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'gemini',
        name: 'Gemini',
        summary: 'The Gemini app, as a custom connected app.',
        signIn: 'oauth',
        requirements: [
            '**For now, Google offers custom apps only to personal Google Accounts in the US, aged 18 or over.** Some reports say a Google AI Pro or Ultra plan is also needed.',
            'You add the app on the web (gemini.google.com); once added, it also works in the Gemini mobile app.',
        ],
        steps: [
            { text: 'On gemini.google.com, open **Settings → Connected Apps** (if you don\'t see it, look under **Personal Intelligence**).' },
            { text: 'Under **Custom apps**, choose **Add a custom app** and paste the server address, then select **Next**.', code: MCP_SERVER_URL },
            { text: 'Sign in with your ExpenseLM account when the browser opens, and approve the connection.' },
        ],
        notes: ['We\'ll update this page when Google opens custom apps to more countries.'],
        help: { label: 'Google: Connected Apps in Gemini', url: 'https://support.google.com/gemini/answer/13695044' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'grok',
        name: 'Grok',
        summary: 'Grok on grok.com, as a custom connector. Also Grok Build.',
        signIn: 'oauth',
        requirements: [
            'A Grok account. xAI says connectors are available to all Grok users.',
            'On Grok Business or Enterprise, a team admin adds the connector in the xAI console first; then each member connects with their own ExpenseLM account.',
        ],
        steps: [
            { text: 'Go to **grok.com/connectors** (or **Connectors** in Grok\'s settings).' },
            { text: 'Select **New Connector**, then **Custom**.' },
            { text: 'Enter the name `ExpenseLM` and the server address below, then select **Add Connector**.', code: MCP_SERVER_URL },
            { text: 'Sign in with your ExpenseLM account when asked, and approve access.' },
            { text: 'Ask about your spending. Grok uses ExpenseLM\'s tools when your question is about your expenses, so mentioning ExpenseLM helps.' },
        ],
        notes: [
            '**Grok Build** (the command line): `grok mcp add --transport http expenselm https://mcp.expenselm.ai/mcp`, then sign in when it opens your browser.',
        ],
        help: { label: 'xAI: Grok connectors', url: 'https://docs.x.ai/grok/connectors' },
        lastChecked: '2026-11-23',
    },
    {
        slug: 'muse',
        name: 'Muse',
        summary: 'Meta\'s Muse assistant, as a custom connector.',
        signIn: 'oauth',
        requirements: ['A Muse account that can add custom connectors.'],
        steps: [
            { text: 'In Muse, open **Settings → Connectors** and choose **Add custom connector**.' },
            { text: 'Paste the server address.', code: MCP_SERVER_URL },
            { text: 'Sign in with your ExpenseLM account on the page Muse opens, and approve access.' },
        ],
        notes: [
            'If you don\'t see **Add custom connector**, ask Muse in a chat instead: "Add a custom connector for the MCP server at https://mcp.expenselm.ai/mcp". It then asks you to sign in.',
            'Meta doesn\'t review custom connectors. Only add servers you trust, and check the address is exactly the one above.',
        ],
        lastChecked: '2026-11-20',
    },
    {
        slug: 'hermes',
        name: 'Hermes Agent',
        summary: 'Nous Research\'s open-source agent, from the command line.',
        signIn: 'oauth',
        requirements: ['Hermes Agent installed, with MCP support (part of the standard install).'],
        steps: [
            { text: 'Add ExpenseLM as a remote server that signs in with OAuth:', code: `hermes mcp add --url ${MCP_SERVER_URL} --auth oauth expenselm` },
            { text: 'Hermes opens your browser: sign in with your ExpenseLM account and approve access.' },
            { text: 'In a running session, reload the servers with `/reload-mcp`. ExpenseLM\'s tools appear as `mcp__expenselm__…`.' },
        ],
        notes: [
            'The entry is saved in `~/.hermes/config.yaml`, and the sign-in in `~/.hermes/mcp-tokens/`.',
            'On a server without a browser (a remote gateway), Hermes prints the sign-in link instead: open it on your computer and paste the result back when asked.',
        ],
        help: { label: 'Hermes: use MCP with Hermes', url: 'https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'openclaw',
        name: 'OpenClaw',
        summary: 'The open-source OpenClaw agent, from the command line.',
        signIn: 'oauth',
        requirements: ['OpenClaw with MCP support (Streamable HTTP and OAuth).'],
        steps: [
            { text: 'Save ExpenseLM as a Streamable HTTP server that signs in with OAuth. Set the transport: OpenClaw assumes SSE without it.', code: `openclaw mcp set expenselm '{"url":"${MCP_SERVER_URL}","transport":"streamable-http","auth":"oauth"}'` },
            { text: 'Sign in with your ExpenseLM account:', code: 'openclaw mcp login expenselm' },
            { text: 'Check it connects and lists the tools:', code: 'openclaw mcp doctor expenselm --probe' },
        ],
        notes: ['You can also add it in the Control UI: **Settings → MCP → Add server**, with the transport **Streamable HTTP**.'],
        help: { label: 'OpenClaw: MCP servers', url: 'https://docs.openclaw.ai/tools/mcp' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'deepseek-harness',
        name: 'DeepSeek Harness',
        summary: 'DeepSeek\'s open-source agent, with an ExpenseLM API key.',
        signIn: 'api-key',
        requirements: [
            'DeepSeek Harness (desktop app or `npx @deepseek-ai/dsh web`). It\'s in public preview, so menu names may change.',
            'An ExpenseLM API key: create one in the web app under **Settings → Connected agents → API keys**. A **read-only** key is enough for questions about your spending.',
        ],
        steps: [
            { text: 'Open **Settings** in DeepSeek Harness and find the **MCP server manager**.' },
            { text: 'Add a server named `expenselm` with the transport **Streamable HTTP** and the server address below.', code: MCP_SERVER_URL },
            { text: 'Add a request header `Authorization` with the value `Bearer ` followed by your API key.', code: 'Authorization: Bearer elm_your_key_here' },
            { text: 'Save. ExpenseLM\'s tools appear as `mcp__expenselm__…` in new sessions.' },
        ],
        notes: [
            'The key is stored in DeepSeek Harness\'s settings. If you\'d rather keep it out of the config, store it as a credential and use `Bearer ${credential:EXPENSELM_API_KEY}` as the header value.',
            'You can revoke the key at any time in **Settings → Connected agents**.',
        ],
        help: { label: 'DeepSeek Harness: MCP server manager', url: 'https://github.com/deepseek-ai/deepseek-harness/tree/main/packages/mcp/mcp-manager' },
        lastChecked: '2026-11-20',
    },
    {
        slug: 'other',
        name: 'Other MCP apps',
        summary: 'Claude Code, Cursor, VS Code and any app that supports remote MCP.',
        signIn: 'oauth',
        requirements: ['An app that supports remote MCP servers over Streamable HTTP. Most also support OAuth sign-in; for those that don\'t, use an API key.'],
        steps: [
            { text: '**Claude Code:**', code: `claude mcp add --transport http expenselm ${MCP_SERVER_URL}` },
            { text: '**Cursor** (`~/.cursor/mcp.json`):', code: `{\n  "mcpServers": {\n    "expenselm": { "url": "${MCP_SERVER_URL}" }\n  }\n}` },
            { text: '**VS Code** (`.vscode/mcp.json`, or **MCP: Add Server** in the command palette):', code: `{\n  "servers": {\n    "expenselm": { "type": "http", "url": "${MCP_SERVER_URL}" }\n  }\n}` },
            { text: 'The app opens a browser to sign in with your ExpenseLM account the first time it connects.' },
            { text: '**Apps without OAuth:** create an API key in the web app (**Settings → Connected agents → API keys**) and send it as a header.', code: 'Authorization: Bearer elm_your_key_here' },
        ],
        notes: ['ExpenseLM is also listed in the official MCP Registry as `ai.expenselm/expenselm`, so apps that browse the registry can find it there.'],
        lastChecked: '2026-11-20',
    },
];

export const examplePrompts: string[] = [
    'What did I spend on food this month, in my home currency?',
    'Show my five biggest expenses last month.',
    'Which subscriptions am I paying for, and how much do they cost a year?',
    'How much did my last trip cost, by category?',
];

export const troubleshooting: { problem: string; fix: string }[] = [
    {
        problem: 'The sign-in page opens but I can\'t sign in.',
        fix: 'Sign in with the method you use in the ExpenseLM app (Google, Apple or email). New here? Create an account at web.expenselm.ai first.',
    },
    {
        problem: 'The assistant says the ExpenseLM sign-in is no longer valid.',
        fix: 'The connection was disconnected (in Settings → Connected agents) or expired. Remove ExpenseLM from the assistant and add it again, then sign in.',
    },
    {
        problem: 'The assistant doesn\'t use ExpenseLM.',
        fix: 'Check the connector is turned on for the chat, start a new chat, and mention ExpenseLM in your question.',
    },
    {
        problem: 'A tool returns "quota exceeded".',
        fix: 'Reading receipts counts towards your monthly extraction quota (300 on Free). Searching and summarising expenses don\'t.',
    },
];

/** Replaces the sign-in items above on guides that connect with an API key. */
export const apiKeyTroubleshooting: { problem: string; fix: string }[] = [
    {
        problem: 'The server refuses the connection (401).',
        fix: 'Check the header is exactly "Authorization: Bearer elm_…" with your whole key, and that the key hasn\'t been revoked in Settings → Connected agents.',
    },
    {
        problem: 'Questions work, but saving or changing expenses fails.',
        fix: 'Read-only keys can only look. Create a key with full access if you want the assistant to add or change expenses.',
    },
];

export function getConnectGuide(slug: string): IConnectGuide | undefined {
    return connectGuides.find((guide) => guide.slug === slug);
}
