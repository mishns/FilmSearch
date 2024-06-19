import { default as React, FC } from "react";
import styles from "./filterformpage.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface FilterFormPageProps {
  handleFilterSubmit: ({
    actionMovie,
    thriller,
    detective,
    biography,
    documentary,
    minRating,
    maxRating,
    firstYear,
    lastYear,
  }: FilterForm) => void;
}

export const FilterFormPage: FC<FilterFormPageProps> = ({
  handleFilterSubmit,
}) => {
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
          />
          <label htmlFor="actionMovie">Боевик</label>
        </div>

        <div className={styles.genreOption}>
          <input type="checkbox" id="thriller" {...register("thriller")} />
          <label htmlFor="thriller">Триллер</label>
        </div>
        <div className={styles.genreOption}>
          <input type="checkbox" id="detective" {...register("detective")} />
          <label htmlFor="detective">Детектив</label>
        </div>
        <div className={styles.genreOption}>
          <input
            type="checkbox"
            id="documentary"
            {...register("documentary")}
          />
          <label htmlFor="documentary">Документальный</label>
        </div>
        <div className={styles.genreOption}>
          <input type="checkbox" id="biography" {...register("biography")} />
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
          defaultValue={1}
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
          defaultValue={10}
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
          defaultValue={1990}
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
          defaultValue={currYear}
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
