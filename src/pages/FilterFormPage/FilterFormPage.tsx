import { default as React, FC, useContext } from "react";
import styles from "./filterformpage.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  minRating: z.string(),
  maxRating: z.string(),
  firstYear: z.string(),
  lastYear: z.string(),
});
export type FilterForm = z.infer<typeof filterFormSchema>;

export const FilterFormPage: FC = () => {
  const { filterData, handleFilterSubmit } = useContext(FilmFilterContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FilterForm>({
    resolver: zodResolver(filterFormSchema),
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
          {...register("minRating")}
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
          {...register("maxRating")}
        />
        <span role="alert">{errors.maxRating?.message?.toString()}</span>
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
          {...register("firstYear")}
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
          {...register("lastYear")}
        />
        <span role="alert">{errors.lastYear?.message?.toString()}</span>
      </fieldset>

      <button type="submit" className={styles.acceptFilter}>
        Применить фильтр
      </button>
    </form>
  );
};
