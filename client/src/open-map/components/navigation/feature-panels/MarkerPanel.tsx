import { useMarkerFeature } from "../../../../shared/hooks/MarkerFeature";
import { useMapContainer } from "../../../../shared/hooks/MapContainer";
import type { MarkerProperties } from "../../../../shared/types/MarkerProperties";
import type { Feature } from "geojson";
import { useState, useEffect, useCallback } from "react";
import CloseLogo from "../../../../assets/material-symbols_close.svg?react";
import PaddingLeft from "../../../../assets/boxicons_dock-left.svg?react";
import PaddingRight from "../../../../assets/boxicons_dock-right.svg?react";
import PaddingTop from "../../../../assets/boxicons_dock-top.svg?react";
import PaddingBottom from "../../../../assets/boxicons_dock-bottom.svg?react";
import SignsBoard from "../../marker/SignsBoard";
import IconsList from "../../marker/IconsList";

export default function MarkerPanel() {
  const {
    handleColorChange,
    handleFontSizeChange,
    handleBackgroundColorChange,
    handlePaddingChange,
    handleLabelChange,
    toggleLabel,
    handleOpacityChange,
    handleRotateChange,
  } = useMarkerFeature();
  const { feature, toggleFeaturePanel } = useMapContainer();

  const properties = (feature?.properties as MarkerProperties) || undefined;

  const {
    name,
    color,
    fontSize,
    padding,
    backgroundColor,
    label,
    opacity,
    rotate,
  } = properties || {};

  return (
    <>
      <div className="feature-panel marker" key={feature.id}>
        <button
          type="button"
          className="close-feature-panel-button t-panel-medium"
          onClick={() => toggleFeaturePanel(null)}
        >
          <CloseLogo width={20} height={20} />
        </button>
        <p className="feature-name t-panel-medium">feature / {name}</p>
        <div className="group colors">
          <div className="wrapper">
            <label htmlFor="feature-color-input" className="t-panel-small">
              Content Color
            </label>
            <input
              type="color"
              id="feature-color-input"
              name="feature-color"
              className="color-input"
              defaultValue={color}
              onBlur={handleColorChange}
            />
          </div>
          <div className="wrapper">
            <label
              htmlFor="feature-background-color-input"
              className="t-panel-small"
            >
              Background Color
            </label>
            <input
              type="color"
              id="feature-background-color-input"
              name="feature-background-color"
              className="color-input"
              defaultValue={backgroundColor}
              onBlur={handleBackgroundColorChange}
            />
          </div>
          <div className="wrapper background-opacity">
            <label htmlFor="opacity-input" className="t-panel-small">
              Opacity
            </label>
            <input
              type="number"
              id="opacity-input"
              name="opacity"
              className="panel-field t-panel-small"
              defaultValue={opacity}
              onBlur={(e) => {
                let value = Number(e.currentTarget.value);
                if (value < 0) {
                  e.currentTarget.value = "0";
                  value = 0;
                }
                if (value > 1) {
                  e.currentTarget.value = "1";
                  value = 1;
                }
                handleOpacityChange(value);
              }}
            />
          </div>
          <div className="wrapper rotate">
            <label htmlFor="rotate-input" className="t-panel-small">
              Rotate
            </label>
            <input
              type="number"
              id="rotate-input"
              name="rotate"
              className="panel-field t-panel-small"
              defaultValue={rotate}
              onBlur={(e) => {
                const value = Number(e.currentTarget.value);
                handleRotateChange(value);
              }}
            />
          </div>
        </div>
        <div className="group sizes">
          <div className="wrapper">
            <label htmlFor="range-width-input" className="t-panel-small">
              Font Size ({fontSize})
            </label>
            <input
              type="range"
              id="range-width-input"
              name="range-width"
              min="1"
              max="30"
              defaultValue={fontSize}
              onMouseUp={handleFontSizeChange}
            />
          </div>
          <p className="t-panel-small">Padding (em)</p>
          <div className="wrapper padding-left-right">
            <div className="field-container padding-left">
              <label
                htmlFor="padding-left-input"
                className="panel-label t-panel-small"
              >
                <PaddingLeft width={16} height={16} />
              </label>
              <input
                type="number"
                name="padding-left"
                id="padding-left-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={padding[3]}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  handlePaddingChange([
                    padding[0],
                    padding[1],
                    padding[2],
                    value,
                  ]);
                }}
              />
            </div>
            <span className="field-bridge" />
            <div className="field-container padding-right">
              <label
                htmlFor="padding-right-input"
                className="panel-label t-panel-small"
              >
                <PaddingRight width={16} height={16} />
              </label>
              <input
                type="number"
                name="padding-right"
                id="padding-right-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={padding[1]}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  handlePaddingChange([
                    padding[0],
                    value,
                    padding[2],
                    padding[3],
                  ]);
                }}
              />
            </div>
          </div>
          <div className="wrapper padding-top-bottom">
            <div className="field-container padding-top">
              <label
                htmlFor="padding-top-input"
                className="panel-label t-panel-small"
              >
                <PaddingTop width={16} height={16} />
              </label>
              <input
                type="number"
                name="padding-top"
                id="padding-top-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={padding[0]}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  handlePaddingChange([
                    value,
                    padding[1],
                    padding[2],
                    padding[3],
                  ]);
                }}
              />
            </div>
            <span className="field-bridge" />
            <div className="field-container padding-bottom">
              <label
                htmlFor="padding-bottom-input"
                className="panel-label t-panel-small"
              >
                <PaddingBottom width={16} height={16} />
              </label>
              <input
                type="number"
                name="padding-bottom"
                id="padding-bottom-input"
                className="panel-field t-panel-small"
                min={0}
                defaultValue={padding[2]}
                onBlur={(e) => {
                  let value = Number(e.currentTarget.value);
                  if (value < 0) value = 0;
                  e.currentTarget.value = value.toString();
                  handlePaddingChange([
                    padding[0],
                    padding[1],
                    value,
                    padding[3],
                  ]);
                }}
              />
            </div>
          </div>
        </div>
        <div className="group content">
          <div className="wrapper">
            <label htmlFor="is-label-checkbox" className="t-panel-small">
              Label
            </label>
            <input
              type="checkbox"
              name="label"
              id="is-label-checkbox"
              className="panel-checkbox"
              defaultChecked={label ? true : false}
              onChange={toggleLabel}
            />
          </div>
          {label && (
            <div className="wrapper label">
              <label htmlFor="content-input" className="t-panel-small">
                Text Content
              </label>
              <textarea
                id="content-input"
                className="panel-field t-panel-small"
                defaultValue={label}
                onBlur={(e) => {
                  const value = e.currentTarget.value;
                  if (value.trim().length <= 0)
                    return (e.currentTarget.value = label);
                  handleLabelChange(value);
                }}
              />
            </div>
          )}
        </div>
        <div className="group signs">
          <p className="signs t-panel-small">Directions Signs</p>
          <SignsBoard />
        </div>
        <div className="group icons">
          <p className="icons t-panel-small">Icons</p>
          <IconsList />
        </div>
      </div>
    </>
  );
}
