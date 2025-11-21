import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  setLayerVisibility, 
  setGridSize, 
  setSnapToGrid, 
  setShowGrid,
  toggleLayer,
  LayerVisibility 
} from '../store/slices/mapEditorSlice';
import { 
  useGetMapEditorPreferencesQuery, 
  useUpdateMapEditorPreferencesMutation 
} from '../api/mapEditorPreferencesApi';
import { useDebounce } from './useDebounce';

export const useMapEditorPreferences = () => {
  const dispatch = useDispatch();
  const layerVisibility = useSelector((state: RootState) => state.mapEditor.layerVisibility);
  const properties = useSelector((state: RootState) => state.mapEditor.properties);

  const { data: preferences, isLoading } = useGetMapEditorPreferencesQuery();
  const [updatePreferences] = useUpdateMapEditorPreferencesMutation();

  const debouncedLayerVisibility = useDebounce(layerVisibility, 1000);
  const debouncedProperties = useDebounce(properties, 1000);
  
  const hasLoadedInitialPreferences = useRef(false);

  useEffect(() => {
    if (preferences && !isLoading && !hasLoadedInitialPreferences.current) {
      Object.entries(preferences.layerVisibility).forEach(([key, value]) => {
        dispatch(setLayerVisibility({ 
          layerId: key as keyof LayerVisibility, 
          visible: value 
        }));
      });

      dispatch(setGridSize(preferences.properties.gridSize));
      dispatch(setSnapToGrid(preferences.properties.snapToGrid));
      dispatch(setShowGrid(preferences.properties.showGrid));
      
      hasLoadedInitialPreferences.current = true;
    }
  }, [preferences, isLoading, dispatch]);

  useEffect(() => {
    if (!isLoading && preferences && hasLoadedInitialPreferences.current) {
      const hasChanges = 
        JSON.stringify(debouncedLayerVisibility) !== JSON.stringify(preferences.layerVisibility) ||
        JSON.stringify(debouncedProperties) !== JSON.stringify(preferences.properties);

      if (hasChanges) {
        updatePreferences({
          layerVisibility: debouncedLayerVisibility,
          properties: debouncedProperties,
        });
      }
    }
  }, [debouncedLayerVisibility, debouncedProperties, preferences, isLoading, updatePreferences]);

  return {
    layerVisibility,
    properties,
    isLoading,
    toggleLayer: (layerId: keyof LayerVisibility) => dispatch(toggleLayer(layerId)),
    setGridSize: (size: number) => dispatch(setGridSize(size)),
    setSnapToGrid: (enabled: boolean) => dispatch(setSnapToGrid(enabled)),
    setShowGrid: (show: boolean) => dispatch(setShowGrid(show)),
  };
};

