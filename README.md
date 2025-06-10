# Sistema Despacho - Legado

## setup DB local (postgres)
```bash
docker run --rm --name despacho-db -e POSTGRES_PASSWORD=mysecretpassword -v despacho:/var/lib/postgresql/data -p 5432:5432 postgres

# migrate
npx prisma migrate dev
```
