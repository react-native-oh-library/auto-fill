/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  TurboModulesFactory,
  RNPackage} from '@rnoh/react-native-openharmony/ts';
import type {
  TurboModule,
  TurboModuleContext,
} from '@rnoh/react-native-openharmony/ts';
import { TM } from "./namespace"
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
