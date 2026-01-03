GEREKLİLİKLER:

solana cli ^2.3.8

anchor cli ^0.31.0

npm ^11.5.1

rustc 1.89.0

=========================================================================================


KULLANIM KILAVUZU:
Öncelikle projeyi oluşturduktan sonra projenin ana dizinine girip terminalde "chmod +x gereklilikler.sh run.sh" komutlarını çalıştırıyoruz. 

Sonrasında "./gereklilikler.sh" komutunu kullanarak hem proje için olan gereklilikleri hem de Program ID'mizi elde ediyoruz. 

Ardından bu program ID'yi ..blokaid/programs/src/lib.rs dosyası içerisindeki "declare_id!("")" içerisine yazıyoruz. 

!Yukarıdaki aşamalar tek seferliktir ve projenin çalıştırılabilmesi için proje klonlandıktan sonra bir kereliğine yapılması yeterlidir!

lib.rs dosyasını kaydedip çıktıktan sonra projenin kök dizine dönüp "./run.sh" komutunu çalıştırıyoruz. 

Cüzdan adresimize airdrop yapmak için bizden bir key-phrase isteyecek. Cüzdanımızın key-phrase'ini yazalım ve 5 SOL airdrop alalım.

Ardından SOL gönderimi için key-phrase'i tekrar girmemiz gerekiyor.

Sonrasında SOL göndermek istediğimiz cüzdanı listeden numarasını seçip ardından göndermek istediğimiz SOL miktarını yazıyoruz ve tebrikler, SOL gönderiminiz başarıyla gerçekleşti.


