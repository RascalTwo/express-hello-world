/** @typedef {String} URLString a string containing a URL */
/** @typedef {String} NumberString a string containing a number */
/** @typedef {String} FloatString a string containing a non-whole number */
/** @typedef {String} TimeString a time string in the format DD:DD */
/** @typedef {TimeString} MinutesString a time string in the format MM:SS */
/** @typedef {TimeString} HoursString a time string in the format HH:MM */
/** @typedef {String} DateString a string in the format YYYY-MM-DD */
/** @typedef {String} EmptyString a empty string */
/** @typedef {'yes' | 'no'} BooleanString */

/**
 * @typedef {Object} BaseBird
 * @property {string} id the catalogue number of the recording on xeno-canto
 * @property {string} gen the generic name of the species
 * @property {string} sp the specific name (epithet) of the species
 * @property {string?} ssp the subspecies name (subspecific epithet)
 * @property {string} group the group to which the species belongs (birds, grasshoppers)
 * @property {string} en the English name of the species
 * @property {string} cnt the country where the recording was made
 * @property {string} loc the name of the locality
 * @property {URLString} file the URL to the audio file
 */

/**
 * @typedef {Object} ExtraBird
 *
 *
 *
 * @property {string} rec the name of the recordist
 *
 *
 *
 * @property {FloatString} lat the latitude of the recording in decimal coordinates
 * @property {FloatString} lng the longitude of the recording in decimal coordinates
 * @property {'call' | 'song' | string} type the sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options)
 * @property {'male' | 'female' | string} sex the sex of the animal
 * @property {'adult' | 'juvenile' | string} stage the life stage of the animal (adult, juvenile, etc.)
 * @property {string} method the recording method (field recording, in the hand, etc.)
 * @property {URLString} url the URL specifying the details of this recording
 *
 * @property {string} filename: the original file name of the audio file
 * @property {object} sono an object with the urls to the four versions of sonograms
 * @property {URLString} sono.small
 * @property {URLString} sono.med
 * @property {URLString} sono.large
 * @property {URLString} sono.full
 * @property {object} osci an object with the urls to the three versions of oscillograms
 * @property {URLString} osci.small
 * @property {URLString} osci.med
 * @property {URLString} osci.large
 * @property {URLString} lic the URL describing the license of this recording
 * @property {string} q the current quality rating for the recording
 * @property {MinutesString} length the length of the recording in minutes
 * @property {HoursString} time the time of day that the recording was made
 * @property {DateString} date the date that the recording was made
 * @property {DateString} uploaded the date that the recording was uploaded to xeno-canto
 * @property {string[]} also an array with the identified background species in the recording
 * @property {string} rmk additional remarks by the recordist
 * @property {BooleanString} birdseen: despite the field name (which was kept to ensure backwards compatibility), this field indicates whether the recorded animal was seen
 * @property {BooleanString} animalseen: was the recorded animal seen?
 * @property {BooleanString} playbackused: was playback used to lure the animal?
 * @property {string?} temperature temperature during recording (applicable to specific groups only)
 * @property {string?} regnr registration number of specimen (when collected)
 * @property {string} auto automatic (non-supervised) recording?
 * @property {string?} dvc recording device used
 * @property {string?} mic microphone used
 * @property {NumberString} smp sample rate
 */

/**
 * @typedef {BaseBird & ExtraBird} FullBird
 */

module.exports = {};
