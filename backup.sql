--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'GERENTE',
    'USUARIO'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Area; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Area" (
    id integer NOT NULL,
    nome text NOT NULL
);


ALTER TABLE public."Area" OWNER TO postgres;

--
-- Name: Area_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Area_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Area_id_seq" OWNER TO postgres;

--
-- Name: Area_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Area_id_seq" OWNED BY public."Area".id;


--
-- Name: Process; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Process" (
    status text NOT NULL,
    id integer NOT NULL,
    responsible text,
    "areaId" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    documentation text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    nome text NOT NULL
);


ALTER TABLE public."Process" OWNER TO postgres;

--
-- Name: Process_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Process_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Process_id_seq" OWNER TO postgres;

--
-- Name: Process_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Process_id_seq" OWNED BY public."Process".id;


--
-- Name: Subprocess; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subprocess" (
    id integer NOT NULL,
    nome text NOT NULL,
    "processId" integer,
    "parentSubId" integer
);


ALTER TABLE public."Subprocess" OWNER TO postgres;

--
-- Name: Subprocess_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Subprocess_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Subprocess_id_seq" OWNER TO postgres;

--
-- Name: Subprocess_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Subprocess_id_seq" OWNED BY public."Subprocess".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    nome text NOT NULL,
    email text NOT NULL,
    senha text NOT NULL,
    role public."UserRole" DEFAULT 'USUARIO'::public."UserRole" NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Area id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Area" ALTER COLUMN id SET DEFAULT nextval('public."Area_id_seq"'::regclass);


--
-- Name: Process id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Process" ALTER COLUMN id SET DEFAULT nextval('public."Process_id_seq"'::regclass);


--
-- Name: Subprocess id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subprocess" ALTER COLUMN id SET DEFAULT nextval('public."Subprocess_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Area; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Area" (id, nome) FROM stdin;
2	TI
4	Financeiro
1	Recursos Humanos
3	Operações
5	Administrativo
\.


--
-- Data for Name: Process; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Process" (status, id, responsible, "areaId", "createdAt", documentation, "updatedAt", nome) FROM stdin;
Concluído	2	Joao	2	2025-03-08 18:24:28.387	\N	2025-03-08 18:25:19.59	Correção de Bug
Em andamento	3	Maria	1	2025-03-08 18:25:03.536	\N	2025-03-08 18:25:19.59	Contratação
Em andamento	1	Fulana	4	2025-03-08 18:23:10.414	\N	2025-03-13 00:35:27.132	Gestão de contratos
\.


--
-- Data for Name: Subprocess; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subprocess" (id, nome, "processId", "parentSubId") FROM stdin;
1	Revisão	1	\N
3	Publicação de vaga	3	\N
4	Seleção	3	\N
5	Entrevistas	3	\N
6	Onboarding	3	\N
7	Code review	2	\N
11	Atualização de planilha	\N	2
2	Digitalização	1	\N
12	Conversão de arquivos	\N	2
13	Registro no sistema	\N	2
14	Envio para nuvem	\N	2
15	Atualização de licença do programa de digitalização	\N	12
16	Fechamento do processo	\N	2
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (nome, email, senha, role, id) FROM stdin;
Ana teste	ana@teste.com	$2b$10$FfvPPmyReYEqQqfGCikJpuQIVAsYpaQ6y4iEsIWNAePAd/mKTnpvi	USUARIO	2
Admin	admin@admin.com	$2b$10$a0c78NDdHy9XSGAB1C7OJuktAy/rlGCwO/yZKzd3IoO9lkFBetGdu	ADMIN	3
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ed28c8f3-5862-44b0-8d95-b5f4f5a15a04	9017ff5bfd48b80a2119bce9d8117cda47cb867e29f1dd686246a6f59123b1b7	2025-03-08 15:10:21.20888-03	20250306170757_init	\N	\N	2025-03-08 15:10:21.196525-03	1
67c178cb-97e4-4e0f-a038-ae8567b5defa	001c3bcc5b3c413dce29debcdce4d92a0e2759bf3220caa95ee3ba8505028712	2025-03-08 15:10:21.223172-03	20250306222302_add_process_table	\N	\N	2025-03-08 15:10:21.209605-03	1
6f87cc01-acd8-4c6d-b0fa-62344c86826b	79a63dc402920e4117564016e3f8aa0c83525028f6015ec60405f07898e0556a	2025-03-08 15:10:21.234418-03	20250306223744_update_process_id	\N	\N	2025-03-08 15:10:21.22395-03	1
1209c051-032e-4651-bae1-4bd6487a2dd1	0e1da8db3fcb47015194f97dca5ded05c4efd7d51949a9ef26f499df5b13630c	2025-03-08 15:10:21.247038-03	20250306230917_update_subprocess	\N	\N	2025-03-08 15:10:21.235054-03	1
6b9e6e87-f829-4edc-82ae-fc5e978f130d	6e91591260f2ac44b61085fc695b884f63c52a761f7a5179686fdf0f56841d83	2025-03-08 15:10:21.25501-03	20250307033527_change_user_id_to_auto_increment	\N	\N	2025-03-08 15:10:21.247541-03	1
2a1d1777-99bc-4a54-842a-4edb801f9ead	3fc965acaa20b12be2968b265cdfb2ac0864a0b58a5bc1c65d8bea612a2c5d43	2025-03-08 15:10:21.257856-03	20250308171032_update_subprocess_process	\N	\N	2025-03-08 15:10:21.255713-03	1
2b4a525b-5cba-4fb9-9350-5b5e50d25caa	1d2efcfb970b4c885ca2c9345a2b61cc7d510f6ee275c148b42c2b0e974275f5	2025-03-08 15:10:21.273755-03	20250308171723_add_updatedat	\N	\N	2025-03-08 15:10:21.258723-03	1
f33476f6-e085-4292-92c9-acf96e0714b7	520ba9b25e2726f673b1d15e25cf420fb6ec9c7806f11522a2d20b4f492d6d47	2025-03-08 15:10:21.281294-03	20250308171835_update	\N	\N	2025-03-08 15:10:21.274736-03	1
946e5937-1b47-4aa4-bb3f-5bb408bbba4a	25aa33a44fa4d033c30ac048048209308f5c49058e88e016174245de7fff23d5	2025-03-08 15:10:21.285033-03	20250308180948_add_updatedat	\N	\N	2025-03-08 15:10:21.281994-03	1
01409019-84a9-415c-a130-e7f2877ef386	a8f4d7d2462b40e1dc7519a188950f02a2daaa81b5c7d74f9bce05219be3b13a	2025-03-08 15:10:32.193171-03	20250308181032_version2	\N	\N	2025-03-08 15:10:32.190549-03	1
158395a8-daec-4dce-bf5f-64912768bc3c	9d237e1cfe6bb5f88432012db0a7765f286439427d085f13096f62accfb05516	2025-03-08 15:14:14.727394-03	20250308181414_add_recursive_subprocess	\N	\N	2025-03-08 15:14:14.688473-03	1
\.


--
-- Name: Area_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Area_id_seq"', 6, true);


--
-- Name: Process_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Process_id_seq"', 10, true);


--
-- Name: Subprocess_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Subprocess_id_seq"', 17, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 3, true);


--
-- Name: Area Area_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Area"
    ADD CONSTRAINT "Area_pkey" PRIMARY KEY (id);


--
-- Name: Process Process_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Process"
    ADD CONSTRAINT "Process_pkey" PRIMARY KEY (id);


--
-- Name: Subprocess Subprocess_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subprocess"
    ADD CONSTRAINT "Subprocess_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Process Process_areaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Process"
    ADD CONSTRAINT "Process_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES public."Area"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Subprocess Subprocess_parentSubId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subprocess"
    ADD CONSTRAINT "Subprocess_parentSubId_fkey" FOREIGN KEY ("parentSubId") REFERENCES public."Subprocess"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Subprocess Subprocess_processId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subprocess"
    ADD CONSTRAINT "Subprocess_processId_fkey" FOREIGN KEY ("processId") REFERENCES public."Process"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

