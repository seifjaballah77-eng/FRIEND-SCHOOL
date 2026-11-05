(function(){
"use strict";
document.addEventListener("DOMContentLoaded",function(){
 const $=s=>document.querySelector(s), names={"ar":"العربية","en":"الإنجليزية","fr":"الفرنسية","es":"الإسبانية","de":"الألمانية","it":"الإيطالية","pt":"البرتغالية","ru":"الروسية","zh-CN":"الصينية","ja":"اليابانية"};
 const button=$("#translateAllLanguages"), input=$("#languageQuery"), source=$("#languageFrom"), output=$("#languageResult");
 if(!button||!input||!source||!output)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 button.addEventListener("click",async function(){
  const query=input.value.trim(),from=source.value;
  if(!query){output.textContent="اكتب كلمة أو جملة أولاً.";input.focus();return;}
  const targets=Object.keys(names).filter(x=>x!==from);
  button.disabled=true;button.textContent="جارٍ ترجمة اللغات…";output.textContent="يتم البحث عن المعنى في اللغات الأخرى…";
  try{
   const results=await Promise.all(targets.map(async to=>{
    const key="friendSchool_translation_"+from+"_"+to+"_"+query;
    let value=null;try{value=localStorage.getItem(key);}catch(_){}
    if(!value){
     const url="https://api.mymemory.translated.net/get?q="+encodeURIComponent(query)+"&langpair="+encodeURIComponent(from+"|"+to);
     const response=await fetch(url);if(!response.ok)throw Error("network");
     const data=await response.json();if(!data||data.responseStatus!==200||!data.responseData||!data.responseData.translatedText)throw Error("translation");
     value=data.responseData.translatedText;
     const decoder=document.createElement("textarea");decoder.innerHTML=value;value=decoder.value;
     try{localStorage.setItem(key,value);}catch(_){}
    }
    return {code:to,name:names[to],text:value};
   }));
   output.innerHTML='<div class="language-results-heading"><strong>الترجمة في اللغات التسع الأخرى</strong><small>من '+esc(names[from])+'</small></div><div class="language-all-results">'+results.map(x=>'<article class="language-translation-card" dir="auto"><span>'+esc(x.name)+'</span><strong>'+esc(x.text)+'</strong><button type="button" class="language-copy-one" data-copy-language="'+esc(x.code)+'">نسخ</button></article>').join("")+'</div>';
   output.querySelectorAll("[data-copy-language]").forEach(b=>b.addEventListener("click",async()=>{const x=results.find(y=>y.code===b.dataset.copyLanguage);try{await navigator.clipboard.writeText(x.text);b.textContent="تم النسخ";}catch(_){b.textContent="انسخ يدوياً";}}));
  }catch(_){output.innerHTML="<strong>لم تكتمل ترجمة جميع اللغات.</strong><small>ربما بلغت خدمة الترجمة حد الاستخدام المؤقت. جرّب مجدداً بعد قليل.</small>";}
  finally{button.disabled=false;button.textContent="ترجم إلى كل اللغات ←";}
 });
});
})();