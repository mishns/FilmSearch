import { default as React, FC, useContext } from "react";
import styles from "./filterformpage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilmFilterContext } from "@src/contexts/FilmFilterContext";

const today = new Date();
const currYear = today.getFullYear();

const filterFormSchema = z.object({
  actionMovie: z.boolean(),
  thriller: z.boolean(),
  detective: z.boolean(),
  documentary: z.boolean(),
  biography: z.boolean(),
  minRating: z.number().min(1).max(10),
  maxRating: z.number().min(1).max(10),
  firstYear: z.number().min(1990).max(currYear),
  lastYear: z.number().min(1990).max(currYear),
});
export type FilterForm = z.infer<typeof filterFormSchema>;

export const FilterFormPage: FC = () => {
  const { filterData, handleFilterSubmit } = useContext(FilmFilterContext);

  const { register, handleSubmit, getValues } = useForm<FilterForm>({
    mode: "onChange",
    shouldFocusError: true,
    shouldUseNativeValidation: true,
  });

  return (
    <form
      className={styles.filmFilterForm}
      onSubmit={handleSubmit(formData => {
        handleFilterSubmit(formData);
      })}
    >
      <fieldset className={styles.genreSelect}>
        <legend className={styles.legend}>Жанр</legend>

        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="actionMovie"
            {...register("actionMovie")}
            defaultChecked={filterData.genres.actionMovie}
          />
          <label htmlFor="actionMovie">Боевик</label>
        </div>

        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="thriller"
            {...register("thriller")}
            defaultChecked={filterData.genres.thriller}
          />
          <label htmlFor="thriller">Триллер</label>
        </div>
        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="detective"
            {...register("detective")}
            defaultChecked={filterData.genres.detective}
          />
          <label htmlFor="detective">Детектив</label>
        </div>
        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="documentary"
            {...register("documentary")}
            defaultChecked={filterData.genres.documentary}
          />
          <label htmlFor="documentary">Документальный</label>
        </div>
        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="biography"
            {...register("biography")}
            defaultChecked={filterData.genres.biography}
          />
          <label htmlFor="biography">Биография</label>
        </div>
      </fieldset>

      <fieldset>
        <legend className={styles.legend}>Рейтинг</legend>
        <label htmlFor="minRating" className="minRating">
          От
        </label>
        <input
          type="number"
          id="minRating"
          min={1}
          max={10}
          defaultValue={filterData.rating.minRating}
          required
          {...register("minRating", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Диапазон рейтинга от 1 до 10",
            },
            max: {
              value: 10,
              message: "Диапазон рейтинга от 1 до 10",
            },
            required: { value: true, message: "Обязательное поле" },
            validate: minRating => {
              const maxRating = getValues("maxRating");
              return (
                minRating <= maxRating ||
                "Минимальный рейтинг не может быть больше максимального"
              );
            },
          })}
        />

        <label htmlFor="maxRating" className="maxRating">
          До
        </label>
        <input
          type="number"
          id="maxRating"
          min={1}
          max={10}
          defaultValue={filterData.rating.maxRating}
          required
          {...register("maxRating", {
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Диапазон рейтинга от 1 до 10",
            },
            max: {
              value: 10,
              message: "Диапазон рейтинга от 1 до 10",
            },
            required: { value: true, message: "Обязательное поле" },
            validate: maxRating => {
              const minRating = getValues("minRating");
              return (
                maxRating >= minRating ||
                "Максимальный рейтинг не может быть меньше минимального"
              );
            },
          })}
        />
      </fieldset>

      <fieldset>
        <legend className={styles.legend}>Год</legend>
        <label htmlFor="firstYear" className="firstYear">
          От
        </label>
        <input
          type="number"
          id="firstYear"
          min={1990}
          max={currYear}
          defaultValue={filterData.years.firstYear}
          required
          {...register("firstYear", {
            valueAsNumber: true,
            min: {
              value: 1990,
              message: `Диапазон годов от 1990 до ${currYear}`,
            },
            max: {
              value: currYear,
              message: `Диапазон годов от 1990 до ${currYear}`,
            },
            required: { value: true, message: "Обязательное поле" },
            validate: firstYear => {
              const lastYear = getValues("lastYear");
              return (
                firstYear <= lastYear ||
                "Первый год не может быть больше последнего"
              );
            },
          })}
        />

        <label htmlFor="lastYear" className="lastYear">
          До
        </label>
        <input
          type="number"
          id="lastYear"
          min={1990}
          max={currYear}
          defaultValue={filterData.years.lastYear}
          required
          {...register("lastYear", {
            valueAsNumber: true,
            min: {
              value: 1990,
              message: `Диапазон годов от 1990 до ${currYear}`,
            },
            max: {
              value: currYear,
              message: `Диапазон годов от 1990 до ${currYear}`,
            },
            required: { value: true, message: "Обязательное поле" },
            validate: lastYear => {
              const firstYear = getValues("firstYear");
              return (
                lastYear >= firstYear ||
                "Последний год не может быть меньше первого"
              );
            },
          })}
        />
      </fieldset>

      <button type="submit" className={styles.acceptFilter}>
        Применить фильтр
      </button>
    </form>
  );
};
