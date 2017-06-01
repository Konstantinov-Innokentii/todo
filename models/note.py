from sqlalchemy import *
from sqlalchemy.orm import relationship, backref

from alchemy import db


class Note(db.Model):

    id = Column(BigInteger, primary_key=True)
    content = Column(Text)
    done = Column(Boolean, default=False, nullable=False)

    def __init__(self, content):
        self.content = content

    def __init__(self,content,done):
        self.content = content
        self.done=done

    def __repr__(self):
        return 'Contents is {}'.format(self.content)


