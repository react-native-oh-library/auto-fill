# the minimum version of CMake.
cmake_minimum_required(VERSION 3.13)
set(CMAKE_VERBOSE_MAKEFILE on)

file(GLOB auto_fill_SRC CONFIGURE_DEPENDS *.cpp)
add_library(auto_fill SHARED ${auto_fill_SRC})
target_include_directories(auto_fill PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})
target_link_libraries(auto_fill PUBLIC rnoh)
