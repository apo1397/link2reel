from .extensions import db

class GenericModel(db.Model):
    __tablename__ = 'generic_model'  # Change this to your desired table name

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    usps = db.Column(db.JSON)
    script = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # Add your custom columns here
    # Example:
    # name = db.Column(db.String(100), nullable=False)
    # description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"<GenericModel {self.id}>" 