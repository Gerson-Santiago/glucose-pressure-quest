import{c as r,j as e,u as h,r as p,a as g,g as j,b as v,P as y,B as d,L as f}from"./index.DZessJXk.js";import{C as b,a as N,b as M,c as k}from"./card.ubZig5Uz.js";import{B as C}from"./badge.BP2hlKyN.js";import{A as w}from"./AddMeasurementForm.c_BQGVYG.js";import{M as m}from"./MeasurementChart.D5Qecnm9.js";import"./label.DfvOp5uf.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=r("Activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=r("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=r("Droplet",[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=r("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=r("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]),o=({title:i,value:c,subtitle:t,icon:l,status:a})=>e.jsxs(b,{className:"transition-all duration-200 hover:shadow-lg",children:[e.jsxs(N,{className:"flex flex-row items-center justify-between pb-2 space-y-0",children:[e.jsx(M,{className:"text-sm font-medium text-muted-foreground",children:i}),e.jsx(l,{className:"w-5 h-5 text-primary"})]}),e.jsxs(k,{children:[e.jsx("div",{className:"text-3xl font-bold text-foreground",children:c}),t&&e.jsx("p",{className:"text-xs text-muted-foreground mt-1",children:t}),a&&e.jsx(C,{variant:a.variant,className:"mt-2",children:a.label})]})]}),z=()=>{const{measurements:i,addMeasurement:c}=h(),[t,l]=p.useState(!1),a=g(i),s=a.lastMeasurement,x=s?j(s.systolic,s.diastolic):null,u=s?v(s.glucose):null;return e.jsx("div",{className:"min-h-screen bg-background",children:e.jsxs("div",{className:"container mx-auto px-4 py-8 max-w-7xl",children:[e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-bold text-foreground mb-2",children:"Bem-vindo"}),e.jsx("p",{className:"text-muted-foreground",children:"Acompanhe suas medições de glicemia e pressão arterial"})]}),e.jsxs("div",{className:"mt-10 space-y-4",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("h3",{className:"text-2xl font-semibold flex items-center gap-2 cursor-pointer select-none",onClick:()=>l(!t),role:"button",tabIndex:0,onKeyDown:n=>(n.key==="Enter"||n.key===" ")&&l(!t),children:[e.jsx(y,{className:"w-6 h-6 text-primary"}),"Adicionar Medição"]}),e.jsx(d,{variant:t?"destructive":"default",onClick:()=>l(!t),children:t?"Fechar Formulário":"Adicionar Medição"})]}),t&&e.jsx(w,{onAdd:c})]}),e.jsx("div",{className:"mt-10"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8",children:[e.jsx(o,{title:"Última Glicemia",value:s?`${s.glucose} mg/dL`:"-",subtitle:`Média: ${a.avgGlucose} mg/dL`,icon:$,status:u??void 0}),e.jsx(o,{title:"Última Pressão Arterial",value:s?`${s.systolic}/${s.diastolic}`:"-",subtitle:`Média: ${a.avgSystolic}/${a.avgDiastolic} mmHg`,icon:A,status:x??void 0}),e.jsx(o,{title:"Último Pulso",value:s?`${s.pulse} bpm`:"-",subtitle:`Média: ${a.avgPulse} bpm`,icon:B}),e.jsx(o,{title:"Total de Medições",value:i.length.toString(),subtitle:"Registros no histórico",icon:L})]}),e.jsxs("div",{className:"mt-10",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("h3",{className:"text-2xl font-semibold flex items-center gap-2",children:[e.jsx(S,{className:"w-6 h-6 text-primary"}),"Resumo dos Gráficos"]}),e.jsx(f,{to:"/charts",children:e.jsx(d,{variant:"default",children:"Ver gráficos completos"})})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-6",children:[e.jsx(m,{measurements:i,type:"glucose"}),e.jsx(m,{measurements:i,type:"pressure"})]})]})]})})};export{z as default};
