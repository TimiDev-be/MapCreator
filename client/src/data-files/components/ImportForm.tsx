import "../styles/_importForm.scss";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useFile } from "../../hooks/File";
import Line from "../../shared/components/Line";

const ValidationSchema = Yup.object().shape({
  file: Yup.mixed<File>()
    .required("Please select a file")
    .test("fileType", "Allowed only .json files", (file) => {
      if (!file) return false;
      return (
        (file as File).type === "application/json" ||
        (file as File).name?.toLowerCase().endsWith(".json")
      );
    }),
});

export default function ImportForm() {
  const { importFile } = useFile();
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleSubmit = async (
    values: { file: File },
    { setSubmitting, resetForm },
  ) => {
    try {
      setSubmitting(true);
      await importFile(values.file);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      alert("Failed to import file: " + (error as Error).message);
    } finally {
      resetForm();
      setFile(undefined);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          file: undefined,
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnChange
      >
        {({ setFieldValue, errors }) => (
          <Form id="import-form">
            <div className="group">
              <p className="form-title t-form-title">Import Drawings</p>
              <p className="form-subtitle t-form-subtitle">
                Load a JSON file with your saved drawings to restore or continue
                your work.
              </p>
            </div>
            <div className="group">
              <div className="wrapper">
                <label htmlFor="file" className="file-label t-form-field">
                  select file
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("file", e.target.files?.[0]);
                    setFile(e.target.files?.[0]);
                  }}
                />
              </div>
              {!errors.file && file && (
                <p className="t-form-about">Selected: {file.name}</p>
              )}
              {errors.file && (
                <div className="form-error t-form-error">
                  <p>{errors.file.toString()}</p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="save-button t-form-field"
              disabled={!!errors.file || !file}
            >
              save
            </button>
            <Line height={1} />
          </Form>
        )}
      </Formik>
    </>
  );
}
