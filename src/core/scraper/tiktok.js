/**
 * @module
 */
/* eslint-disable require-await */

import { matchPattern } from "../../tools/matchpattern.js";

/**
 * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
 *
 * @param {URL}      _url         L'URL d'une vidéo TikTok.
 * @param {Object}   content      Le contenu de l'URL.
 * @param {Function} content.html La fonction retournant la promesse contenant
 *                                le document HTML.
 * @returns {Promise<?string>} Une promesse contenant le lien du
 *                             <em>fichier</em> ou <code>null</code>.
 */
const action = async function (_url, content) {
    const doc = await content.html();
    const script = doc.querySelector("script#__NEXT_DATA__");

    const json = JSON.parse(script.text);
    return json.props.pageProps.itemInfo?.itemStruct.video.playAddr ?? null;
};
export const extract = matchPattern(action, "*://www.tiktok.com/*");
