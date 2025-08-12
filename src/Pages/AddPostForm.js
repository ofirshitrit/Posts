import { useState } from "react";
import "../Styles/form.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";

export default function AddPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const addPostMutation = useMutation({

    mutationFn: async (newPost) => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
      if (!res.ok) {
        throw new Error("Failed to add post");
      }
      return res.json();
    },
    onSuccess: (data) => {
      // Refresh the posts list and save the new list in the cache
      queryClient.setQueryData(["posts"], (oldPosts) => {
      return oldPosts ? [...oldPosts, data] : [data];
    });
      setSuccessMessage(
        "Form submitted successfully! Your post has been created."
      );
      setTimeout(() => {
        setSuccessMessage("");
      }, 7000);
      setFormData({ title: "", body: "" });

    },
    onError: (error) => {
      setErrorMessage(error.message);
            setTimeout(() => {
        setErrorMessage("");
      }, 7000);
      setSuccessMessage("");
    },
  });

  const validateField = (name, value) => {
    switch (name) {
      case "title":
        if (!value.trim()) {
          return "Title is required";
        }
        return "";
      case "body":
        if (!value.trim()) {
          return "Body is required";
        }
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    //Loop each field and validate it
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newPost = {
        userId: 200,
        title: formData.title,
        body: formData.body,
      };
      addPostMutation.mutate(newPost);
      setFormErrors({});
      setFormData({ title: "", body: "" });
    }
  };

  const isFormValid =
    Object.keys(validateForm()).length === 0 &&
    formData.title.trim() &&
    formData.body.trim();

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="form-title">Add New Post</h2>

          {successMessage && (
            <div className="alert-message alert-success">
              <div className="alert-content">
                <CheckCircle className="alert-icon success-icon" />
                <p className="alert-text">{successMessage}</p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="alert-message alert-error">
              <div className="alert-content">
                <XCircle className="alert-icon error-icon" />
                <p className="alert-text">{errorMessage}</p>
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">
              Title: <span className="mandatory-field">*</span>{" "}
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title for your post"
              className={formErrors.title ? "error-input" : ""}
            />
            {formErrors.title && (
              <p className="error-msg-input">{formErrors.title}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="body">
              Body: <span className="mandatory-field">*</span>
            </label>
            <textarea
              name="body"
              id="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Write the body of the post here"
              className={formErrors.body ? "error-input" : ""}
            />
            {formErrors.body && <p className="error-msg-input">{formErrors.body}</p>}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="submit-btn"
              disabled={addPostMutation.isLoading}
            >
              {addPostMutation.isLoading ? (
                <>
                  <div className="btn-spinner"></div>
                  Loading...
                </>
              ) : (
                "Add Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
