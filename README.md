# Teknisk information

För att starta projektet ändra directory till backend i terminalen och kör: npm run dev

Starta en ny terminal ändra directory till backend och kör: json-server --watch data/db.json --port 3000

Starta ännu ett terminal fönster ändra directory till frontend och kör: npm run dev

Färdig användare:
user@user.com
password

# Reflekterande text 

Drone Delights

Detta projekt har varit både roligt, utmanande och frustrerande på samma gång.
Jag är väldigt praktiskt lagd, så länge något funkar är jag inte särskilt brydd om hur det ser ut. Problemen började därför direkt i figma och bara att välja ut ett färgtema blev svårt. Eftersom jag inte är riktigt som alla andra så var min första idé att göra någon form av fantasy-version av projektet med Alv soppa, dvärg mjöd och kanske drakar som leveransmetod. Där kom grundidén till färgtemat som jag sen bollade med chatgpt för att komma fram till det slutgiltliga temat. Jag tycker att det blev väldigt varmt och inbjudande.

För att inte slita av det hår jag har kvar på grund av beslutsångest över designen arbetade jag utifrån tekniken att först skissa upp hela projektets flöde, sedan färdigställa en sida i Figma, skriva koden till den och därefter hoppa tillbaka till Figma för nästa sida.

När det kommer till själva kodningen har jag lärt mig mycket under projektets gång. Till exempel började jag med att bara använda 3 komponenter - header, main och footer och lade all kod i pages. Efterhand kom man underfund med att "detta är en rätt tydlig sektion, skulle jag inte kunna göra om det till en komponent?". Ett tänk som jag kom in i mycket under testningskursen och verkligen gillar strukturen på.

Jag brukar börja med backenden när jag börjar på nya projekt och så även denna gång, jag ville ville få mer rutin på att arbeta med riktiga databaser och bestämde mig därför att sätta upp en user databas hostad på mongodb atlas. Eftersom vi arbetat med det i skolan tidigare hade jag både gammal kod att referera till och instruktioner att gå tillbaka till. 
När det var på plats fokuserade jag på routingen. Direkt undersökte jag om det fanns ett sätt att strukturera upp routes bättre till exempel genom någon form av helper-fil. Det resulterade i att jag skapade en ROUTES.js-fil för att samla alla path constants på samma ställe, vilket gjorde routing-logiken mer lättöverskådlig och enklare att underhålla.

Efter att ha frågat chatgpt hur lång texten är visar det sig att jag måste börja avsluta. Men i det stora hela har det flutit på ganska bra när man fått dessa bitar på plats, den största stressen kom dock näst sista dagen när jag satt och skulle finslipa css och implementera mobilanpassning på de sista bitarna. Då inser jag att jag missförstått hur css funkar i react och plötsligt ser allt annorlunda ut i hela projektet. Jag hade förstått det som att när man importerar en css fil till till exempel en sida så är det bara där den stilen blir apllicerad, eftersom vi är så nära inlämning blev jag bekväm och satte kanske inte klasser eller id på allt utan tänkte att det spelar ingen roll eftersom det appliceras bara i denna sidan som importerar css filen. Så var det inte och plötsligt hade jag massa css som aplicerats globalt på allt från input fields till containers så det blev mycket backtracking.

Final thoughts
Jag är nöjd med vad jag har fått ihop, särskilt att jag lyckats få det att både fungera och se bra ut. Jag har utvecklat min förståelse för både frontend och backend, men det jag uppskattar mest är hur mitt sätt att strukturera kod har förbättrats. Jag ser fram emot att ta med mig allt jag lärt mig till framtida projekt.

# TL;DR
Kul, utmanande, frustrerande. Tur att man inte ska bli renodlad frontendare. 



