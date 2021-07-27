import { Profile } from '@remixproject/plugin-utils'
import React, { useState } from 'react'
import { PersistActivatedPlugin, RemoveActivatedPlugin } from '../../pluginManagerStateMachine'
import { PluginManagerComponent } from '../../types'
import '../remix-ui-plugin-manager.css'
interface PluginCardProps {
  profile: Profile & {
    icon?: string
  }
  pluginComponent: PluginManagerComponent
  buttonText: string
}

// eslint-disable-next-line no-empty-pattern
function PluginCard ({
  profile,
  pluginComponent,
  buttonText
}: PluginCardProps) {
  const [displayName] = useState<string>((profile.displayName) ? profile.displayName : profile.name)
  const [docLink] = useState<JSX.Element>((profile.documentation) ? (
    <a href={profile.documentation} className="px-1" title="link to documentation" target="_blank" rel="noreferrer">
      <i aria-hidden="true" className="fas fa-book"/>
    </a>
  ) : null)

  const [versionWarning] = useState<JSX.Element>((profile.version && profile.version.match(/\b(\w*alpha\w*)\b/g)) ? (
    <small title="Version Alpha" className="remixui_versionWarning plugin-version">alpha</small>
  ) : (profile.version && profile.version.match(/\b(\w*beta\w*)\b/g)) ? (
    <small title="Version Beta" className="remixui_versionWarning plugin-version">beta</small>
  ) : null)
  // const [stateManager] = useState<PluginManagerStateMachine>(new PluginManagerStateMachine(pluginComponent))

  return (
    <div className="list-group list-group-flush plugins-list-group" data-id="pluginManagerComponentActiveTile">
      <article className="list-group-item py-1 mb-1 plugins-list-group-item" title={displayName}>
        <div className="remixui_row justify-content-between align-items-center mb-2">
          <h6 className="remixui_displayName plugin-name">
            <div>
              {displayName}
              {docLink}
              {versionWarning}
            </div>
            { pluginComponent.isActive(profile.name)
              ? <button
                onClick={() => {
                  pluginComponent.deactivateP(profile.name)
                  RemoveActivatedPlugin(profile.name)
                }}
                className="btn btn-secondary btn-sm"
                data-id={`pluginManagerComponentDeactivateButton${profile.name}`}
              >
                {buttonText}
              </button>
              : <button
                onClick={() => {
                  pluginComponent.activateP(profile.name)
                  PersistActivatedPlugin(pluginComponent, profile)
                }}
                className="btn btn-success btn-sm"
                data-id={`pluginManagerComponentActivateButton${profile.name}`}
              >
                {buttonText}
              </button>
            }
          </h6>
        </div>
        <div className="remixui_description d-flex text-body plugin-text mb-2">
          { profile.icon ? <img src={profile.icon} className="mr-1 mt-1 remixui_pluginIcon" alt="profile icon"/> : null }
          <span className="remixui_descriptiontext">{profile.description}</span>
        </div>
      </article>
    </div>
  )
}

export default PluginCard