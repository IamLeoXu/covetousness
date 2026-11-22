/* Rebuild the direct-open audio payload after replacing the MP3. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),scope={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'timeline.js'),'utf8'),scope);
const music=scope.window.TIMELINE.music,input=path.resolve(root,music);
if(!input.startsWith(root+path.sep))throw new Error('The track must be inside the project');
const bytes=fs.readFileSync(input),sha256=crypto.createHash('sha256').update(bytes).digest('hex');
fs.writeFileSync(path.join(root,'assets/audio-source.js'),'/* Local-file audio payload; bytes identical to the configured track. */\nwindow.LOCAL_AUDIO_DATA = '+JSON.stringify({music,sha256,base64:bytes.toString('base64')})+';\n');
console.log('Embedded '+music+' ('+bytes.length+' bytes, SHA-256 '+sha256+')');
