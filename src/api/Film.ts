import { validateResponse } from "@api/validateResponse";
import { z } from "zod";

const API_URL = "https://api.kinopoisk.dev/v1.4";

const filmRatingSchema = z.object({
  kp: z.number().nullable(),
  imdb: z.number().nullable(),
  filmCritics: z.number().nullable(),
  russianFilmCritics: z.number().nullable(),
  await: z.number().nullable(),
});
const filmPosterSchema = z.object({
  url: z.string().nullable(),
  previewUrl: z.string().nullable(),
});
const genresSchema = z.array(z.object({ name: z.string() }));

export const filmSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  alternativeName: z.string().nullable().optional(),
  enName: z.string().nullable().optional(),
  year: z.number().nullable(),
  rating: filmRatingSchema,
  poster: filmPosterSchema,
  genres: genresSchema.optional(),
  description: z.string().nullable().optional(),
  shortDescription: z.string().nullable().optional(),
});
export type Film = z.infer<typeof filmSchema>;

export const filmListSchema = z.object({
  docs: z.array(filmSchema),
  total: z.number(),
  limit: z.number(),
  page: z.number(),
  pages: z.number(),
});
export type FilmList = z.infer<typeof filmListSchema>;

interface FetchFilmListI {
  page: number;
  limit: number;
  sortField: "rating.kp" | "id";
  sortType: "1" | "-1";
  genres: Array<string>;
  rating: { min: number; max: number };
  years: { first: number; last: number };
  ids: Array<number>;
  isFavFilter: boolean;
}
export function fetchFilmList({
  page,
  limit,
  sortField,
  sortType,
  genres,
  rating,
  years,
  ids: filterIds,
  isFavFilter,
}: FetchFilmListI): Promise<FilmList> {
  const requestPath = `${API_URL}/movie?`;
  const selectFields = [
    ["selectFields", "id"],
    ["selectFields", "name"],
    ["selectFields", "year"],
    ["selectFields", "poster"],
    ["selectFields", "rating"],
    ["selectFields", "alternativeName"],
    ["selectFields", "enName"],
  ];
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortField,
    sortType,
    year: `${years.first}-${years.last}`,
    "rating.kp": `${rating.min}-${rating.max}`,
  });
  genres.forEach(genre => queryParams.append("genres.name", genre));
  if (isFavFilter) {
    filterIds.forEach(id => queryParams.append("id", id.toString()));
  }
  selectFields.forEach(field => queryParams.append(field[0], field[1]));

  const requestUrl = requestPath + queryParams;

  return fetch(requestUrl, {
    headers: {
      "X-API-KEY": `${process.env.X_API_KEY}`,
    },
  })
    .then(validateResponse)
    .then(response => response.json())
    .then(data => filmListSchema.parse(data));
}

export function fetchFilmById(id: number) {
  return fetch(`${API_URL}/movie/${id}`, {
    headers: {
      "X-API-KEY": `${process.env.X_API_KEY}`,
    },
  })
    .then(validateResponse)
    .then(response => response.json())
    .then(data => filmSchema.parse(data));
}
