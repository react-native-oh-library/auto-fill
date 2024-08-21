import { TurboModuleRegistry, RootTag } from 'react-native';
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';

export interface Spec extends TurboModule {
}

export default TurboModuleRegistry.get<Spec>('AutoFillTurboModule')!;
