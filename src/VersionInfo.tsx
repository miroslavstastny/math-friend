import React from 'react'

export const VersionInfo: React.FunctionComponent = () => {
  return <p>{__COMMIT_HASH__}</p>
}
