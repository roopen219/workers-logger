import{diary as r}from"diary";import{sprintf as t,compare as o}from"diary/utils";import{enable as e}from"diary";var i=(t,o,e)=>{const i=[],m={},a=r(o||"",(r=>{i.push(r)}));return a.report=r=>{if("function"==typeof e)return e(i,{req:t,res:r,meta:m})},a.meta=(r,t)=>{m[r]=t},a};export{o as compare,e as enable,t as format,i as track};