# Copyright (c) 2024 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


# the minimum version of CMake.
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB auto_fill_SRC CONFIGURE_DEPENDS *.cpp)
add_library(auto_fill SHARED ${auto_fill_SRC})
target_include_directories(auto_fill PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(auto_fill PUBLIC rnoh)
