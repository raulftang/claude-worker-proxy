import * as types from './types'
import * as provider from './provider'
import * as utils from './utils'

// curl https://api.anthropic.com/v1/messages \
//      --header "x-api-key: $ANTHROPIC_API_KEY" \
//      --header "anthropic-version: 2023-06-01" \
//      --header "content-type: application/json" \
//      --data \
// '{
//     "model": "claude-opus-4-1-20250805",
//     "max_tokens": 1024,
//     "messages": [
//         {"role": "user", "content": "Hello, world"}
//     ]
// }'
export class impl implements provider.Provider {
    async convertToProviderRequest(request: Request, baseUrl: string, apiKey: string): Promise<Request> {
        const claudeRequest = (await request.json()) as types.ClaudeRequest

        const finalUrl = utils.buildUrl(baseUrl, 'v1/messages')

        const headers = new Headers(request.headers)
        headers.set('authorization', `${apiKey}`)
        headers.set('Content-Type', 'application/json')

        return new Request(finalUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(claudeRequest)
        })
    }

    async convertToClaudeResponse(claudeResponse: Response): Promise<Response> {
        return claudeResponse
    }
}
