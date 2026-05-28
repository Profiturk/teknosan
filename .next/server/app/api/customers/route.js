"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/customers/route";
exports.ids = ["app/api/customers/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcustomers%2Froute&page=%2Fapi%2Fcustomers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2Froute.ts&appDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcustomers%2Froute&page=%2Fapi%2Fcustomers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2Froute.ts&appDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_OneDrive_1_YAPAY_ZEKA_2_MUSTERI_TAKIP_teknosan_musteri_takip_v2_teknosan_app_api_customers_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/customers/route.ts */ \"(rsc)/./app/api/customers/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/customers/route\",\n        pathname: \"/api/customers\",\n        filename: \"route\",\n        bundlePath: \"app/api/customers/route\"\n    },\n    resolvedPagePath: \"D:\\\\OneDrive\\\\1-YAPAY ZEKA\\\\2-MUSTERI TAKIP\\\\teknosan_musteri_takip_v2\\\\teknosan\\\\app\\\\api\\\\customers\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_OneDrive_1_YAPAY_ZEKA_2_MUSTERI_TAKIP_teknosan_musteri_takip_v2_teknosan_app_api_customers_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/customers/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjdXN0b21lcnMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmN1c3RvbWVycyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmN1c3RvbWVycyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDT25lRHJpdmUlNUMxLVlBUEFZJTIwWkVLQSU1QzItTVVTVEVSSSUyMFRBS0lQJTVDdGVrbm9zYW5fbXVzdGVyaV90YWtpcF92MiU1Q3Rla25vc2FuJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDT25lRHJpdmUlNUMxLVlBUEFZJTIwWkVLQSU1QzItTVVTVEVSSSUyMFRBS0lQJTVDdGVrbm9zYW5fbXVzdGVyaV90YWtpcF92MiU1Q3Rla25vc2FuJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUMrRDtBQUM1STtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8/NzcxOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxPbmVEcml2ZVxcXFwxLVlBUEFZIFpFS0FcXFxcMi1NVVNURVJJIFRBS0lQXFxcXHRla25vc2FuX211c3RlcmlfdGFraXBfdjJcXFxcdGVrbm9zYW5cXFxcYXBwXFxcXGFwaVxcXFxjdXN0b21lcnNcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2N1c3RvbWVycy9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2N1c3RvbWVyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY3VzdG9tZXJzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcT25lRHJpdmVcXFxcMS1ZQVBBWSBaRUtBXFxcXDItTVVTVEVSSSBUQUtJUFxcXFx0ZWtub3Nhbl9tdXN0ZXJpX3Rha2lwX3YyXFxcXHRla25vc2FuXFxcXGFwcFxcXFxhcGlcXFxcY3VzdG9tZXJzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9jdXN0b21lcnMvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcustomers%2Froute&page=%2Fapi%2Fcustomers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2Froute.ts&appDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/customers/route.ts":
/*!************************************!*\
  !*** ./app/api/customers/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   dynamic: () => (/* binding */ dynamic)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _lib_schemas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/schemas */ \"(rsc)/./lib/schemas.ts\");\nconst dynamic = \"force-dynamic\";\n\n\n\n\n\nasync function GET(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Nicht autorisiert\"\n        }, {\n            status: 401\n        });\n        const { searchParams } = new URL(request.url);\n        const search = searchParams.get(\"search\") ?? \"\";\n        const where = {};\n        if (search) {\n            where.OR = [\n                {\n                    name: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                },\n                {\n                    phone: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                },\n                {\n                    email: {\n                        contains: search,\n                        mode: \"insensitive\"\n                    }\n                }\n            ];\n        }\n        const customers = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.customer.findMany({\n            where,\n            include: {\n                _count: {\n                    select: {\n                        sales: true\n                    }\n                }\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(customers);\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message ?? \"Fehler\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n        if (!session) return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Nicht autorisiert\"\n        }, {\n            status: 401\n        });\n        const body = await request.json();\n        const parsed = _lib_schemas__WEBPACK_IMPORTED_MODULE_4__.CustomerSchema.safeParse(body);\n        if (!parsed.success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: parsed.error.errors[0]?.message ?? \"Ung\\xfcltige Daten\"\n            }, {\n                status: 400\n            });\n        }\n        const data = parsed.data;\n        const customer = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.customer.create({\n            data: {\n                name: data.name,\n                phone: data.phone || null,\n                email: data.email || null,\n                address: data.address || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(customer, {\n            status: 201\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message ?? \"Fehler\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cC8uL2FwcC9hcGkvY3VzdG9tZXJzL3JvdXRlLnRzPzY5YzgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGR5bmFtaWMgPSAnZm9yY2UtZHluYW1pYyc7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tICdAL2xpYi9wcmlzbWEnO1xuaW1wb3J0IHsgQ3VzdG9tZXJTY2hlbWEgfSBmcm9tICdAL2xpYi9zY2hlbWFzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpO1xuICAgIGlmICghc2Vzc2lvbikgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdOaWNodCBhdXRvcmlzaWVydCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcblxuICAgIGNvbnN0IHsgc2VhcmNoUGFyYW1zIH0gPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgICBjb25zdCBzZWFyY2ggPSBzZWFyY2hQYXJhbXMuZ2V0KCdzZWFyY2gnKSA/PyAnJztcblxuICAgIGNvbnN0IHdoZXJlOiBhbnkgPSB7fTtcbiAgICBpZiAoc2VhcmNoKSB7XG4gICAgICB3aGVyZS5PUiA9IFtcbiAgICAgICAgeyBuYW1lOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgYXMgY29uc3QgfSB9LFxuICAgICAgICB7IHBob25lOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgYXMgY29uc3QgfSB9LFxuICAgICAgICB7IGVtYWlsOiB7IGNvbnRhaW5zOiBzZWFyY2gsIG1vZGU6ICdpbnNlbnNpdGl2ZScgYXMgY29uc3QgfSB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXN0b21lcnMgPSBhd2FpdCBwcmlzbWEuY3VzdG9tZXIuZmluZE1hbnkoe1xuICAgICAgd2hlcmUsXG4gICAgICBpbmNsdWRlOiB7IF9jb3VudDogeyBzZWxlY3Q6IHsgc2FsZXM6IHRydWUgfSB9IH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogJ2Rlc2MnIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oY3VzdG9tZXJzKTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvcj8ubWVzc2FnZSA/PyAnRmVobGVyJyB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG4gICAgaWYgKCFzZXNzaW9uKSByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ05pY2h0IGF1dG9yaXNpZXJ0JyB9LCB7IHN0YXR1czogNDAxIH0pO1xuXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgIGNvbnN0IHBhcnNlZCA9IEN1c3RvbWVyU2NoZW1hLnNhZmVQYXJzZShib2R5KTtcbiAgICBpZiAoIXBhcnNlZC5zdWNjZXNzKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IHBhcnNlZC5lcnJvci5lcnJvcnNbMF0/Lm1lc3NhZ2UgPz8gJ1VuZ8O8bHRpZ2UgRGF0ZW4nIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gcGFyc2VkLmRhdGE7XG4gICAgY29uc3QgY3VzdG9tZXIgPSBhd2FpdCBwcmlzbWEuY3VzdG9tZXIuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSB8fCBudWxsLFxuICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCB8fCBudWxsLFxuICAgICAgICBhZGRyZXNzOiBkYXRhLmFkZHJlc3MgfHwgbnVsbCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKGN1c3RvbWVyLCB7IHN0YXR1czogMjAxIH0pO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yPy5tZXNzYWdlID8/ICdGZWhsZXInIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJkeW5hbWljIiwiTmV4dFJlc3BvbnNlIiwiZ2V0U2VydmVyU2Vzc2lvbiIsImF1dGhPcHRpb25zIiwicHJpc21hIiwiQ3VzdG9tZXJTY2hlbWEiLCJHRVQiLCJyZXF1ZXN0Iiwic2Vzc2lvbiIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInNlYXJjaCIsImdldCIsIndoZXJlIiwiT1IiLCJuYW1lIiwiY29udGFpbnMiLCJtb2RlIiwicGhvbmUiLCJlbWFpbCIsImN1c3RvbWVycyIsImN1c3RvbWVyIiwiZmluZE1hbnkiLCJpbmNsdWRlIiwiX2NvdW50Iiwic2VsZWN0Iiwic2FsZXMiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwibWVzc2FnZSIsIlBPU1QiLCJib2R5IiwicGFyc2VkIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsImVycm9ycyIsImRhdGEiLCJjcmVhdGUiLCJhZGRyZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/customers/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Şifre\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"E-Mail und Passwort sind erforderlich\");\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    throw new Error(\"Benutzer nicht gefunden\");\n                }\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().compare(credentials.password, user.password);\n                if (!isValid) {\n                    throw new Error(\"Ung\\xfcltiges Passwort\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session?.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDa0U7QUFDUjtBQUNwQjtBQUNSO0FBRXZCLE1BQU1JLGNBQStCO0lBQzFDQyxTQUFTSix3RUFBYUEsQ0FBQ0MsK0NBQU1BO0lBQzdCSSxXQUFXO1FBQ1ROLDJFQUFtQkEsQ0FBQztZQUNsQk8sTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBU0MsTUFBTTtnQkFBVztZQUMvQztZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUNBLE1BQU1DLE9BQU8sTUFBTWIsK0NBQU1BLENBQUNhLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFBRVIsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFDcEM7Z0JBQ0EsSUFBSSxDQUFDTSxNQUFNO29CQUNULE1BQU0sSUFBSUQsTUFBTTtnQkFDbEI7Z0JBQ0EsTUFBTUksVUFBVSxNQUFNZix1REFBYyxDQUFDSyxZQUFZSSxRQUFRLEVBQUVHLEtBQUtILFFBQVE7Z0JBQ3hFLElBQUksQ0FBQ00sU0FBUztvQkFDWixNQUFNLElBQUlKLE1BQU07Z0JBQ2xCO2dCQUNBLE9BQU87b0JBQUVNLElBQUlMLEtBQUtLLEVBQUU7b0JBQUVYLE9BQU9NLEtBQUtOLEtBQUs7b0JBQUVGLE1BQU1RLEtBQUtSLElBQUk7Z0JBQUM7WUFDM0Q7UUFDRjtLQUNEO0lBQ0RjLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLFdBQVc7UUFDVCxNQUFNQyxLQUFJLEVBQUVDLEtBQUssRUFBRVYsSUFBSSxFQUFPO1lBQzVCLElBQUlBLE1BQU07Z0JBQ1JVLE1BQU1MLEVBQUUsR0FBR0wsS0FBS0ssRUFBRTtZQUNwQjtZQUNBLE9BQU9LO1FBQ1Q7UUFDQSxNQUFNSixTQUFRLEVBQUVBLE9BQU8sRUFBRUksS0FBSyxFQUFPO1lBQ25DLElBQUlKLFNBQVNOLE1BQU07Z0JBQ2hCTSxRQUFRTixJQUFJLENBQVNLLEVBQUUsR0FBR0ssTUFBTUwsRUFBRTtZQUNyQztZQUNBLE9BQU9DO1FBQ1Q7SUFDRjtJQUNBSyxPQUFPO1FBQ0xDLFFBQVE7SUFDVjtJQUNBQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGVBQWU7QUFDckMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL2xpYi9hdXRoLnRzP2JmN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gJ25leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHMnO1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgYWRhcHRlcjogUHJpc21hQWRhcHRlcihwcmlzbWEpLFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ8WeaWZyZScsIHR5cGU6ICdwYXNzd29yZCcgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRS1NYWlsIHVuZCBQYXNzd29ydCBzaW5kIGVyZm9yZGVybGljaCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdXNlcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmVudXR6ZXIgbmljaHQgZ2VmdW5kZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoY3JlZGVudGlhbHMucGFzc3dvcmQsIHVzZXIucGFzc3dvcmQpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZ8O8bHRpZ2VzIFBhc3N3b3J0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaWQ6IHVzZXIuaWQsIGVtYWlsOiB1c2VyLmVtYWlsLCBuYW1lOiB1c2VyLm5hbWUgfTtcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHNlc3Npb246IHtcbiAgICBzdHJhdGVneTogJ2p3dCcsXG4gIH0sXG4gIGNhbGxiYWNrczoge1xuICAgIGFzeW5jIGp3dCh7IHRva2VuLCB1c2VyIH06IGFueSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH06IGFueSkge1xuICAgICAgaWYgKHNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy9sb2dpbicsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTtcbiJdLCJuYW1lcyI6WyJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsInByaXNtYSIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJFcnJvciIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1ZhbGlkIiwiY29tcGFyZSIsImlkIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJwYWdlcyIsInNpZ25JbiIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"error\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLQyxLQUF5QixHQUFnQjtRQUFDO0tBQVEsR0FBRyxDQUFTO0FBQ3JFLEdBQUc7QUFFTCxJQUFJQSxJQUF5QixFQUFjSixnQkFBZ0JFLE1BQU0sR0FBR0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHAvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBnbG9iYWxGb3JQcmlzbWEgPSBnbG9iYWxUaGlzIGFzIHVua25vd24gYXMge1xuICBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XG4gIG5ldyBQcmlzbWFDbGllbnQoe1xuICAgIGxvZzogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyBbJ2Vycm9yJ10gOiBbJ2Vycm9yJ10sXG4gIH0pO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/schemas.ts":
/*!************************!*\
  !*** ./lib/schemas.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CustomerSchema: () => (/* binding */ CustomerSchema),\n/* harmony export */   ProductSchema: () => (/* binding */ ProductSchema),\n/* harmony export */   SaleSchema: () => (/* binding */ SaleSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/lib/index.mjs\");\n\nconst SaleSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    productName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, \"Produktname ist erforderlich\").max(200),\n    productDetails: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(500).optional().nullable(),\n    price: zod__WEBPACK_IMPORTED_MODULE_0__.z.number({\n        invalid_type_error: \"Preis muss eine Zahl sein\"\n    }).positive(\"Preis muss gr\\xf6\\xdfer als 0 sein\"),\n    quantity: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().int().positive(\"Menge muss mindestens 1 sein\").default(1),\n    saleDate: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),\n    customerId: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, \"Kunde ist erforderlich\"),\n    productId: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional().nullable(),\n    taxType: zod__WEBPACK_IMPORTED_MODULE_0__.z.enum([\n        \"B\",\n        \"N\",\n        \"B-N\",\n        \"N-B\"\n    ]).optional().nullable(),\n    paymentMethod: zod__WEBPACK_IMPORTED_MODULE_0__.z.enum([\n        \"Bar\",\n        \"SEPA\",\n        \"\\xdcberweisung\",\n        \"Karte\"\n    ]).optional().nullable()\n});\nconst CustomerSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, \"Name ist erforderlich\").max(200),\n    phone: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(50).optional().nullable(),\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().email(\"Ung\\xfcltige E-Mail-Adresse\").max(200).optional().nullable().or(zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(\"\")),\n    address: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(500).optional().nullable()\n});\nconst ProductSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(1, \"Produktname ist erforderlich\").max(200),\n    description: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(500).optional().nullable(),\n    width: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(50).optional().nullable(),\n    length: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().max(50).optional().nullable(),\n    price: zod__WEBPACK_IMPORTED_MODULE_0__.z.number({\n        invalid_type_error: \"Preis muss eine Zahl sein\"\n    }).min(0),\n    stock: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().int().min(0).default(0),\n    active: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(true)\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2NoZW1hcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXdCO0FBRWpCLE1BQU1DLGFBQWFELGtDQUFDQSxDQUFDRSxNQUFNLENBQUM7SUFDakNDLGFBQWFILGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdDLEdBQUcsQ0FBQyxHQUFHLGdDQUFnQ0MsR0FBRyxDQUFDO0lBQ25FQyxnQkFBZ0JQLGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdFLEdBQUcsQ0FBQyxLQUFLRSxRQUFRLEdBQUdDLFFBQVE7SUFDdkRDLE9BQU9WLGtDQUFDQSxDQUFDVyxNQUFNLENBQUM7UUFBRUMsb0JBQW9CO0lBQTRCLEdBQUdDLFFBQVEsQ0FBQztJQUM5RUMsVUFBVWQsa0NBQUNBLENBQUNXLE1BQU0sR0FBR0ksR0FBRyxHQUFHRixRQUFRLENBQUMsZ0NBQWdDRyxPQUFPLENBQUM7SUFDNUVDLFVBQVVqQixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHSSxRQUFRO0lBQzdCVSxZQUFZbEIsa0NBQUNBLENBQUNJLE1BQU0sR0FBR0MsR0FBRyxDQUFDLEdBQUc7SUFDOUJjLFdBQVduQixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHSSxRQUFRLEdBQUdDLFFBQVE7SUFDekNXLFNBQVNwQixrQ0FBQ0EsQ0FBQ3FCLElBQUksQ0FBQztRQUFDO1FBQUs7UUFBSztRQUFPO0tBQU0sRUFBRWIsUUFBUSxHQUFHQyxRQUFRO0lBQzdEYSxlQUFldEIsa0NBQUNBLENBQUNxQixJQUFJLENBQUM7UUFBQztRQUFPO1FBQVE7UUFBZTtLQUFRLEVBQUViLFFBQVEsR0FBR0MsUUFBUTtBQUNwRixHQUFHO0FBRUksTUFBTWMsaUJBQWlCdkIsa0NBQUNBLENBQUNFLE1BQU0sQ0FBQztJQUNyQ3NCLE1BQU14QixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHQyxHQUFHLENBQUMsR0FBRyx5QkFBeUJDLEdBQUcsQ0FBQztJQUNyRG1CLE9BQU96QixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHRSxHQUFHLENBQUMsSUFBSUUsUUFBUSxHQUFHQyxRQUFRO0lBQzdDaUIsT0FBTzFCLGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdzQixLQUFLLENBQUMsK0JBQTRCcEIsR0FBRyxDQUFDLEtBQUtFLFFBQVEsR0FBR0MsUUFBUSxHQUFHa0IsRUFBRSxDQUFDM0Isa0NBQUNBLENBQUM0QixPQUFPLENBQUM7SUFDaEdDLFNBQVM3QixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHRSxHQUFHLENBQUMsS0FBS0UsUUFBUSxHQUFHQyxRQUFRO0FBQ2xELEdBQUc7QUFFSSxNQUFNcUIsZ0JBQWdCOUIsa0NBQUNBLENBQUNFLE1BQU0sQ0FBQztJQUNwQ3NCLE1BQU14QixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHQyxHQUFHLENBQUMsR0FBRyxnQ0FBZ0NDLEdBQUcsQ0FBQztJQUM1RHlCLGFBQWEvQixrQ0FBQ0EsQ0FBQ0ksTUFBTSxHQUFHRSxHQUFHLENBQUMsS0FBS0UsUUFBUSxHQUFHQyxRQUFRO0lBQ3BEdUIsT0FBT2hDLGtDQUFDQSxDQUFDSSxNQUFNLEdBQUdFLEdBQUcsQ0FBQyxJQUFJRSxRQUFRLEdBQUdDLFFBQVE7SUFDN0N3QixRQUFRakMsa0NBQUNBLENBQUNJLE1BQU0sR0FBR0UsR0FBRyxDQUFDLElBQUlFLFFBQVEsR0FBR0MsUUFBUTtJQUM5Q0MsT0FBT1Ysa0NBQUNBLENBQUNXLE1BQU0sQ0FBQztRQUFFQyxvQkFBb0I7SUFBNEIsR0FBR1AsR0FBRyxDQUFDO0lBQ3pFNkIsT0FBT2xDLGtDQUFDQSxDQUFDVyxNQUFNLEdBQUdJLEdBQUcsR0FBR1YsR0FBRyxDQUFDLEdBQUdXLE9BQU8sQ0FBQztJQUN2Q21CLFFBQVFuQyxrQ0FBQ0EsQ0FBQ29DLE9BQU8sR0FBR3BCLE9BQU8sQ0FBQztBQUM5QixHQUFHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwLy4vbGliL3NjaGVtYXMudHM/NDVjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuZXhwb3J0IGNvbnN0IFNhbGVTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHByb2R1Y3ROYW1lOiB6LnN0cmluZygpLm1pbigxLCAnUHJvZHVrdG5hbWUgaXN0IGVyZm9yZGVybGljaCcpLm1heCgyMDApLFxuICBwcm9kdWN0RGV0YWlsczogei5zdHJpbmcoKS5tYXgoNTAwKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gIHByaWNlOiB6Lm51bWJlcih7IGludmFsaWRfdHlwZV9lcnJvcjogJ1ByZWlzIG11c3MgZWluZSBaYWhsIHNlaW4nIH0pLnBvc2l0aXZlKCdQcmVpcyBtdXNzIGdyw7bDn2VyIGFscyAwIHNlaW4nKSxcbiAgcXVhbnRpdHk6IHoubnVtYmVyKCkuaW50KCkucG9zaXRpdmUoJ01lbmdlIG11c3MgbWluZGVzdGVucyAxIHNlaW4nKS5kZWZhdWx0KDEpLFxuICBzYWxlRGF0ZTogei5zdHJpbmcoKS5vcHRpb25hbCgpLFxuICBjdXN0b21lcklkOiB6LnN0cmluZygpLm1pbigxLCAnS3VuZGUgaXN0IGVyZm9yZGVybGljaCcpLFxuICBwcm9kdWN0SWQ6IHouc3RyaW5nKCkub3B0aW9uYWwoKS5udWxsYWJsZSgpLFxuICB0YXhUeXBlOiB6LmVudW0oWydCJywgJ04nLCAnQi1OJywgJ04tQiddKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gIHBheW1lbnRNZXRob2Q6IHouZW51bShbJ0JhcicsICdTRVBBJywgJ8OcYmVyd2Vpc3VuZycsICdLYXJ0ZSddKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IEN1c3RvbWVyU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigxLCAnTmFtZSBpc3QgZXJmb3JkZXJsaWNoJykubWF4KDIwMCksXG4gIHBob25lOiB6LnN0cmluZygpLm1heCg1MCkub3B0aW9uYWwoKS5udWxsYWJsZSgpLFxuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgnVW5nw7xsdGlnZSBFLU1haWwtQWRyZXNzZScpLm1heCgyMDApLm9wdGlvbmFsKCkubnVsbGFibGUoKS5vcih6LmxpdGVyYWwoJycpKSxcbiAgYWRkcmVzczogei5zdHJpbmcoKS5tYXgoNTAwKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG59KTtcblxuZXhwb3J0IGNvbnN0IFByb2R1Y3RTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDEsICdQcm9kdWt0bmFtZSBpc3QgZXJmb3JkZXJsaWNoJykubWF4KDIwMCksXG4gIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLm1heCg1MDApLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgd2lkdGg6IHouc3RyaW5nKCkubWF4KDUwKS5vcHRpb25hbCgpLm51bGxhYmxlKCksXG4gIGxlbmd0aDogei5zdHJpbmcoKS5tYXgoNTApLm9wdGlvbmFsKCkubnVsbGFibGUoKSxcbiAgcHJpY2U6IHoubnVtYmVyKHsgaW52YWxpZF90eXBlX2Vycm9yOiAnUHJlaXMgbXVzcyBlaW5lIFphaGwgc2VpbicgfSkubWluKDApLFxuICBzdG9jazogei5udW1iZXIoKS5pbnQoKS5taW4oMCkuZGVmYXVsdCgwKSxcbiAgYWN0aXZlOiB6LmJvb2xlYW4oKS5kZWZhdWx0KHRydWUpLFxufSk7XG4iXSwibmFtZXMiOlsieiIsIlNhbGVTY2hlbWEiLCJvYmplY3QiLCJwcm9kdWN0TmFtZSIsInN0cmluZyIsIm1pbiIsIm1heCIsInByb2R1Y3REZXRhaWxzIiwib3B0aW9uYWwiLCJudWxsYWJsZSIsInByaWNlIiwibnVtYmVyIiwiaW52YWxpZF90eXBlX2Vycm9yIiwicG9zaXRpdmUiLCJxdWFudGl0eSIsImludCIsImRlZmF1bHQiLCJzYWxlRGF0ZSIsImN1c3RvbWVySWQiLCJwcm9kdWN0SWQiLCJ0YXhUeXBlIiwiZW51bSIsInBheW1lbnRNZXRob2QiLCJDdXN0b21lclNjaGVtYSIsIm5hbWUiLCJwaG9uZSIsImVtYWlsIiwib3IiLCJsaXRlcmFsIiwiYWRkcmVzcyIsIlByb2R1Y3RTY2hlbWEiLCJkZXNjcmlwdGlvbiIsIndpZHRoIiwibGVuZ3RoIiwic3RvY2siLCJhY3RpdmUiLCJib29sZWFuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/schemas.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcustomers%2Froute&page=%2Fapi%2Fcustomers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcustomers%2Froute.ts&appDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5COneDrive%5C1-YAPAY%20ZEKA%5C2-MUSTERI%20TAKIP%5Cteknosan_musteri_takip_v2%5Cteknosan&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();