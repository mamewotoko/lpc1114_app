lpc1114_app: 02_sound
=====================

手順: 回路作成
------------
01_blink の配線に付け足す。

|ピン1|ピン2|
|----|----|
|LPC1114の7ピン|ブレッドボードの-|
|LPC1114の8ピン|ブレッドボードの+|
|1kの抵抗|LPC1114の4ピンと圧電サラウンダーの間|
|圧電サラウンダー|ブレッドボードの-|

![回路図](image/lpc1114_bell_breadboard.png)

手順: プログラムの書込み
--------------------
hexファイル: c:\workspace\Timer_test\Debug\Timer_test.hex をFlashMagicでやく

手順: 動作確認
------------
1. TeraTerm/Screenなどの端末エミュレータでボーレート9600でつなぐ
(COMポートは調べておく。macだと /dev/tty.usbserial?)
2. リセット用タクトスイッチをおすと端末に「LPC1114マイコン」の様なメッセージがでる。
3. PCの1-8のキーを押すと圧電サラウンダーから音がでる。

----
増山隆 < mamewotoko@gmail.com >  
http://mamewo.ddo.jp
