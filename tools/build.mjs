// node tools/build.mjs  ->  dist/veilspire.html (one self-contained file)
import fs from 'fs';import path from 'path';import {fileURLToPath} from 'url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
const mime={png:'image/png',ogg:'audio/ogg',ttf:'font/ttf'};
const uri=p=>'data:'+mime[path.extname(p).slice(1)]+';base64,'+fs.readFileSync(path.join(root,p)).toString('base64');
const inl=s=>s.replace(/assets\/[\w\/.\-]+\.(png|ogg|ttf)/g,m=>uri(m));
let html=inl(fs.readFileSync(path.join(root,'index.html'),'utf8'));
html=html.replace(/<script src="([^"]+)"><\/script>/g,(m,s)=>'<script>\n'+inl(fs.readFileSync(path.join(root,s),'utf8'))+'\n</script>');
fs.mkdirSync(path.join(root,'dist'),{recursive:true});
fs.writeFileSync(path.join(root,'dist/veilspire.html'),html);
console.log('dist/veilspire.html',(html.length/1048576).toFixed(2)+' MB');
