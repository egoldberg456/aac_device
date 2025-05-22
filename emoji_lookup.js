const EMOJI_API_KEY = '11b96ace31f7e1179b92e9b2eff35813e27a6c2e';
const EMOJI_API_URL = 'https://emoji-api.com/emojis';

/**
 * Fetches the best emoji for a given word using emoji-api.com
 * @param {string} word
 * @returns {Promise<string>} The emoji character, or a fallback if not found
 */
export async function getEmojiForWordApi(word) {
    if (!word || typeof word !== 'string') return '🔲';
    try {
        const url = `${EMOJI_API_URL}?search=${encodeURIComponent(word)}&access_key=${EMOJI_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].character) {
            return data[0].character;
        }
        return '🔲';
    } catch (err) {
        console.error('Emoji API error:', err);
        return '🔲';
    }
} 