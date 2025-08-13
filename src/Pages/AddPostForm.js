// AddFormPage: page for creating a new post or editing an existing one

import { useState, useEffect } from "react";
import "../Styles/form.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";
import { addPostRequest, updatePostRequest } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddPostForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingPost = location.state?.post || null;

  const [formData, setFormData] = useState({
    title: editingPost ? editingPost.title : "",
    body: editingPost ? editingPost.body : "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const queryClient = useQueryClient();

  // If the form is for edit, fill the fields with the values otherwise make it empty
   useEffect(() => {
    setFormData({
      title: editingPost ? editingPost.title : "",
      body: editingPost ? editingPost.body : "",
    });
  }, [editingPost]);

  
  const addPostMutation = useMutation({
    mutationFn: addPostRequest,
    onSuccess: (data) => {
      // Refresh the posts list and save the new list in the cache
      queryClient.setQueryData(["posts"], (oldPosts) => {
        return oldPosts ? [...oldPosts, data] : [data];
      });

      setSuccessMessage("Post created successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);

      setFormData({ title: "", body: "" });
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setSuccessMessage("");
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePostRequest,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(["posts"], (oldPosts) =>
        oldPosts
          ? oldPosts.map((post) =>
              post.id === updatedPost.id ? updatedPost : post
            )
          : [updatedPost]
      );

      setSuccessMessage("Post updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 2000);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 5000);
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
      if (editingPost) {
        updatePostMutation.mutate({
          id: editingPost.id,
          title: formData.title,
          body: formData.body,
        });
      } else {
        addPostMutation.mutate({
          userId: 200,
          title: formData.title,
          body: formData.body,
        });
      }
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
          <h2 className="form-title">
            {editingPost ? "Edit Post" : "Add New Post"}
          </h2>

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
            {formErrors.body && (
              <p className="error-msg-input">{formErrors.body}</p>
            )}
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="submit-btn"
              disabled={
                addPostMutation.isLoading ||
                updatePostMutation.isLoading ||
                !isFormValid
              }
            >
              {addPostMutation.isLoading || updatePostMutation.isLoading ? (
                <>
                  <div className="btn-spinner"></div>
                  Loading...
                </>
              ) : editingPost ? (
                "Update Post"
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
