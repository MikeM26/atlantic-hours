// Enquiries are passed to WhatsApp only after the visitor submits the form.
var WA_NUMBER = "27656625625";
function $(id){return document.getElementById(id)}
function fmt(h){var n=Math.round(h*60)%1440;return String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0")}
function caption(h){if(h<9)return "Out on the Atlantic";if(h<14)return "Wine, and time to take it slowly";if(h<16.5)return "Art and a different perspective";if(h<19.5)return "Sundowners with an ocean view";return "A table worth staying for"}
function paint(h){
 var key=h<9?'day':h<14?'wine':h<16.5?'art':h<19.5?'sunset':'night';
 ['day','wine','art','sunset','night'].forEach(function(k){var img=$('photo-'+k);img.classList.toggle('active',k===key);img.setAttribute('aria-hidden',String(k!==key))});
 $('clock').textContent=fmt(h);$('cap').textContent=caption(h);$('hr').setAttribute('aria-valuetext',fmt(h)+' '+caption(h));
 var choices=[8,12,15,17.5,21],nearest=choices.reduce(function(a,b){return Math.abs(a-h)<=Math.abs(b-h)?a:b});
 document.querySelectorAll('[data-hour]').forEach(function(b){b.setAttribute('aria-pressed',String(Number(b.dataset.hour)===nearest))})
}
$('hr').addEventListener('input',function(){paint(Number(this.value))});
document.querySelectorAll('[data-hour]').forEach(function(b){b.addEventListener('click',function(){$('hr').value=b.dataset.hour;paint(Number(b.dataset.hour))})});
document.querySelectorAll('[data-start]').forEach(function(a){a.addEventListener('click',function(){$('start').value=a.dataset.start})});
document.querySelectorAll('[data-idea]').forEach(function(a){a.addEventListener('click',function(){$('start').value='Tailor-made';$('vibe').value=a.dataset.vibe;var note=a.dataset.idea;if(!$('notes').value.includes(note)){$('notes').value=[$('notes').value.trim(),note].filter(Boolean).join('; ')}})});
paint(Number($('hr').value));
function val(id){return $(id).value.trim()}
$('enquiry').addEventListener('submit',function(e){
 e.preventDefault();
 var text=['Hi Atlantic Hours, I’d like a plan for Cape Town.','','Starting point: '+val('start'),'Name: '+val('name'),'Dates: '+val('when'),'Group size: '+val('ppl'),'First time in Cape Town: '+val('first'),'Vibe: '+val('vibe'),'Budget per person: '+val('bud'),'Notes: '+(val('notes')||'-')].join('\n');
 $('msg').value=text;$('out').style.display='block';
 if(WA_NUMBER){var url='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(text);$('wa').href=url;$('wa').hidden=false;window.open(url,'_blank','noopener,noreferrer')}
 $('status').textContent='Your enquiry is ready in WhatsApp. If it did not open, use the button below. You choose when to send.';$('out').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});$('msg').focus({preventScroll:true});
});
$('copy').addEventListener('click',async function(){
 var copied=false;try{await navigator.clipboard.writeText($('msg').value);copied=true}catch(e){$('msg').focus();$('msg').select();try{copied=document.execCommand('copy')}catch(err){}}
 $('status').textContent=copied?'Copied. Ready to share with your Atlantic Hours contact.':'Select the message above and copy it manually.';
});

// Gallery data is embedded in exported copies; previews stay in memory on this device.
var galleryPhotos=[];try{galleryPhotos=JSON.parse($('gallery-data').textContent)}catch(e){}
function renderOwnGallery(){
 var holder=$('own-gallery');holder.replaceChildren();$('own-gallery-empty').hidden=galleryPhotos.length>0;
 galleryPhotos.forEach(function(p){var f=document.createElement('figure'),im=document.createElement('img'),cap=document.createElement('figcaption');im.src=p.src;im.alt=p.caption||'Atlantic Hours photograph';im.loading='lazy';cap.textContent=p.caption||'';f.append(im,cap);holder.append(f)});
}
function renderGalleryEditor(){
 var box=$('gallery-editor-items');box.replaceChildren();galleryPhotos.forEach(function(p,i){var row=document.createElement('div'),im=document.createElement('img'),fields=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input'),remove=document.createElement('button');row.className='gallery-editor-row';im.src=p.src;im.alt='Selected photo '+(i+1);label.textContent='Caption for photograph '+(i+1);input.id='photo-caption-'+i;label.htmlFor=input.id;input.value=p.caption||'';input.maxLength=180;input.addEventListener('input',function(){galleryPhotos[i].caption=input.value});remove.type='button';remove.textContent='Remove photograph';remove.addEventListener('click',function(){galleryPhotos.splice(i,1);renderGalleryEditor();renderOwnGallery()});fields.append(label,input,remove);row.append(im,fields);box.append(row)})
}
$('gallery-files').addEventListener('change',async function(){
 var files=Array.from(this.files),room=12-galleryPhotos.length;$('gallery-editor-status').textContent='Preparing photographs…';
 for(var file of files.slice(0,room)){
  if(!['image/jpeg','image/png','image/webp'].includes(file.type))continue;
  try{var url=URL.createObjectURL(file),im=new Image();im.src=url;await im.decode();var scale=Math.min(1,1600/Math.max(im.naturalWidth,im.naturalHeight)),c=document.createElement('canvas');c.width=Math.round(im.naturalWidth*scale);c.height=Math.round(im.naturalHeight*scale);c.getContext('2d').drawImage(im,0,0,c.width,c.height);galleryPhotos.push({src:c.toDataURL('image/jpeg',.9),caption:''});URL.revokeObjectURL(url)}catch(e){$('gallery-editor-status').textContent='One photograph could not be opened. Try JPEG, PNG or WebP.'}
 }
 renderGalleryEditor();renderOwnGallery();this.value='';$('gallery-editor-status').textContent=galleryPhotos.length+' photographs ready. This preview has not been published.';
});
$('gallery-preview').addEventListener('click',function(){renderOwnGallery();location.hash='our-gallery'});
function routeLegal(){
 var hash=location.hash,which=hash==='#terms'?'terms-page':hash==='#privacy'?'privacy-page':hash==='#gallery-editor'?'gallery-editor-page':null;
 $('site-main').hidden=!!which;['terms-page','privacy-page','gallery-editor-page'].forEach(function(id){$(id).hidden=id!==which});
 document.title=which==='terms-page'?'Booking terms | Atlantic Hours':which==='privacy-page'?'Privacy notice | Atlantic Hours':which==='gallery-editor-page'?'Gallery editor | Atlantic Hours':'Atlantic Hours | Tailor-made Cape Town experiences';
 if(which){window.scrollTo(0,0);if(which==='gallery-editor-page')renderGalleryEditor()}else if(hash){var target=document.getElementById(hash.slice(1));if(target)requestAnimationFrame(function(){target.scrollIntoView()})}else window.scrollTo(0,0);
}
async function dataFromUrl(url){var response=await fetch(url);if(!response.ok)throw new Error('Could not include '+url);var blob=await response.blob();return await new Promise(function(resolve,reject){var r=new FileReader();r.onload=function(){resolve(r.result)};r.onerror=reject;r.readAsDataURL(blob)})}
$('gallery-export').addEventListener('click',async function(){
 var button=this;button.disabled=true;$('gallery-editor-status').textContent='Including images and styles in your website…';
 try{
  var clone=document.documentElement.cloneNode(true);clone.querySelector('#site-main').hidden=false;['terms-page','privacy-page','gallery-editor-page'].forEach(function(id){clone.querySelector('#'+id).hidden=true});clone.querySelector('title').textContent='Atlantic Hours | Tailor-made Cape Town experiences';
  var exportPhotos=[];for(var photo of galleryPhotos){exportPhotos.push({src:photo.src.startsWith('data:')?photo.src:await dataFromUrl(new URL(photo.src,location.href)),caption:photo.caption||''})}clone.querySelector('#gallery-data').textContent=JSON.stringify(exportPhotos).replace(/</g,'\u003c');clone.querySelector('#own-gallery').replaceChildren();clone.querySelector('#gallery-editor-items').replaceChildren();clone.querySelector('#gallery-editor-status').textContent='';clone.querySelector('#gallery-export').disabled=false;clone.querySelector('#gallery-file-ready').hidden=true;clone.querySelector('#gallery-file-ready').removeAttribute('href');clone.querySelector('#wa').hidden=true;clone.querySelector('#wa').setAttribute('href','#');clone.querySelector('#out').style.display='none';clone.querySelector('#msg').textContent='';clone.querySelector('#status').textContent='';
  clone.querySelectorAll('input,textarea').forEach(function(el){el.removeAttribute('value');if(el.id==='ppl')el.setAttribute('value','2');if(el.tagName==='TEXTAREA')el.textContent=''});clone.querySelectorAll('select option').forEach(function(o){o.removeAttribute('selected')});
  for(var sheet of Array.from(clone.querySelectorAll('link[rel="stylesheet"]'))){var style=document.createElement('style');var response=await fetch(new URL(sheet.getAttribute('href'),location.href));if(!response.ok)throw new Error('Could not include stylesheet');style.textContent=await response.text();sheet.replaceWith(style)}
  for(var sourceScript of Array.from(clone.querySelectorAll('script[src]'))){var response=await fetch(new URL(sourceScript.getAttribute('src'),location.href));if(!response.ok)throw new Error('Could not include script');sourceScript.textContent=await response.text();sourceScript.removeAttribute('src')}
  clone.querySelectorAll('a[href="terms.html"]').forEach(function(a){a.setAttribute('href','#terms')});clone.querySelectorAll('a[href="privacy.html"]').forEach(function(a){a.setAttribute('href','#privacy')});
  var replacements=new Map();var imgs=Array.from(clone.querySelectorAll('img[src]'));
  for(var im of imgs){var src=im.getAttribute('src');if(!src.startsWith('data:')){if(!replacements.has(src))replacements.set(src,await dataFromUrl(new URL(src,location.href)));im.setAttribute('src',replacements.get(src))}}
  for(var st of clone.querySelectorAll('style')){var css=st.textContent,urls=Array.from(css.matchAll(/url\(["']?([^\)"']+)["']?\)/g));for(var match of urls){var u=match[1];if(!u.startsWith('data:'))css=css.replace(u,await dataFromUrl(new URL(u,location.href)))}st.textContent=css}
  var icon=clone.querySelector('link[rel="icon"]');if(icon)icon.href=await dataFromUrl(new URL(icon.getAttribute('href'),location.href));
  var blob=new Blob(['<!DOCTYPE html>\n'+clone.outerHTML],{type:'text/html'}),link=URL.createObjectURL(blob),a=$('gallery-file-ready');if(a.dataset.previousUrl)URL.revokeObjectURL(a.dataset.previousUrl);a.href=link;a.dataset.previousUrl=link;a.hidden=false;$('gallery-editor-status').textContent='Your website is ready. Choose Download index.html, then publish the downloaded file to update the hosted gallery.';
 }catch(e){$('gallery-editor-status').textContent='The export could not finish: '+e.message}finally{button.disabled=false}
});
renderOwnGallery();window.addEventListener('hashchange',routeLegal);routeLegal();


