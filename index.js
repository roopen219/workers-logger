const { diary:r } = require('diary');const { sprintf:t, compare:o } = require('diary/utils');const { enable:e } = require('diary');var i=(t,o,e)=>{const i=[],m={},a=r(o||"",(r=>{i.push(r)}));return a.report=r=>{if("function"==typeof e)return e(i,{req:t,res:r,meta:m})},a.meta=(r,t)=>{m[r]=t},a};exports.compare=o;exports.enable=e;exports.format=t;exports.track=i;