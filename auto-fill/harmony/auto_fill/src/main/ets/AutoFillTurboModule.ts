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

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from './namespace';
import { autoFillManager } from '@kit.AbilityKit';
import { common } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';

declare function getContext(context: any): common.UIAbilityContext;
let context = getContext(this) as common.UIAbilityContext;

export class AutoFillTurboModule extends TurboModule implements TM.AutoFillTurboModule.Spec {
  private lastSaveTime: number | null = null;
  private logger = this.ctx.logger.clone('AutoFillTurboModuleLogger');

  autoSave(onSuccess: () => void, onFailure: () => void): void {
    const currentTime = Date.now();

    if (this.lastSaveTime && currentTime - this.lastSaveTime < 2000) {
      this.logger.error('autoSave called too frequently, please wait for 2 seconds.');
      onFailure?.();
      return;
    }

    this.lastSaveTime = currentTime;

    try {
      window
        .getLastWindow(context)
        .then((value) => {
          const uiContext = value.getUIContext();
          autoFillManager.requestAutoSave(uiContext, {
            onSuccess: () => {
              onSuccess?.();
              this.logger.info('save request onSuccess in Native');
            },
            onFailure: () => {
              onFailure?.();
              this.logger.error('save request onFailure in Native');
            },
          });
        })
        .catch((error) => {
          this.logger.error(
            `getLastWindow catch error, code: ${(error as BusinessError).code}, message: ${
              (error as BusinessError).message
            }`
          );
        });
    } catch (error) {
      this.logger.error(
        `catch error, code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`
      );
    }
  }
}
