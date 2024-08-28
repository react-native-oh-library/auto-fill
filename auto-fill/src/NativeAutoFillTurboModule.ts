import { TurboModuleRegistry } from "react-native";
import type { TurboModule } from "react-native/Libraries/TurboModule/RCTExport";

export interface Spec extends TurboModule {
  autoSave: (onSuccess?: () => void, onFailure?: () => void) => void;
}

export default TurboModuleRegistry.get<Spec>("AutoFillTurboModule")!;
