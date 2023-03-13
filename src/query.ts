import groq from "groq";

/**
 * Use in your groq queries to ensure images have all the necessary metadata to be useful in picture tags
 *
 * eg.
 * @example
 * const query = groq`*[_type == 'homePage'][0] {
 *   ...,
 *   ${picture("bgImage")}
 * }`
 *
 * @example
 * const query = groq`*[_type == 'homePage'][0] {
 *   ...,
 *   ${picture("bgImage", {as: "bg"})}
 * }`
 *
 * @param attr name of the attribute
 * @param opts.as what the attribute should be named in our output object
 * @returns enhanced groq fragment
 */
export const picture = (attr: string, opts?: { as: string }) => groq`'${
  opts?.as ?? attr
}': ${attr} {
  ...,
  asset->{
    ...,
    metadata {
      lqip,
      dimensions
    }
  }
}`;
