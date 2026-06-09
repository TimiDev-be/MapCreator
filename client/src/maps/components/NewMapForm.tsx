import "../styles/_newMapForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMap } from "../../shared/hooks/Map";
import Line from "../../shared/components/Line";

const ValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export default function NewMapForm() {
  const { newMap } = useMap();

  const handleSubmit = async (
    values: { name: string },
    { setSubmitting, resetForm },
  ) => {
    setSubmitting(true);
    try {
      newMap(values.name);
      resetForm();
    } catch (error) {
      alert("Failed to create map: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={ValidationSchema}
        validateOnBlur
        validateOnChange
        validateOnMount
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form id="new-map-form">
            <div className="group">
              <p className="form-title t-form-title">Create New Map</p>
              <p className="form-subtitle t-form-subtitle">
                Give your map a name to get started.
              </p>
            </div>
            <div className="group">
              <div className="wrapper">
                <label htmlFor="name" className="t-form-field">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="form-field t-form-field"
                  placeholder="Map Name"
                />
              </div>
              <ErrorMessage
                name="name"
                component="div"
                className="form-error t-form-error"
              />
            </div>
            <button
              type="submit"
              className="new-map-button t-form-field"
              disabled={!!errors.name}
            >
              Create
            </button>
            <Line height={1} />
            <p className="t-form-about">
              Newly created maps are added to the end of the list. You can
              reorder them later using the sort options.
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
