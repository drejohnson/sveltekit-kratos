local claims = {
  email_verified: false
} + std.extVar('claims');

{
  identity: {
    traits: {
      // Allowing unverified email addresses enables account
      // enumeration attacks, especially if the value is used for
      // e.g. verification or as a password login identifier.
      //
      // Therefore we only return the email if it (a) exists and (b) is marked verified
      [if "email" in claims && claims.email_verified then "email" else null]: claims.email,
      [if "given_name" in claims || "family_name" in claims then "name" else null]: {
        [if "given_name" in claims then "first" else null]: claims.given_name,
        [if "family_name" in claims then "last" else null]: claims.family_name,
      },
    },
  },
}