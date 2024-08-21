import {
  TurboModulesFactory,
  RNPackage} from '@rnoh/react-native-openharmony/ts';
import type {
  TurboModule,
  TurboModuleContext,
} from '@rnoh/react-native-openharmony/ts';
import { RNC, TM } from "./namespace"
import { AutoFillTurboModule } from './AutoFillTurboModule';


class AutoFillTurboModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (name === TM.AutoFillTurboModule.NAME) {
      return new AutoFillTurboModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.AutoFillTurboModule.NAME;
  }
}


export class AutoFillPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new AutoFillTurboModulesFactory(ctx);
  }

}
